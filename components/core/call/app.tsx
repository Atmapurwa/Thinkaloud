'use client';

import { SessionView } from '@/components/core/call/session-view';
import { Welcome } from '@/components/core/call/welcome';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useConnectionDetails from '@/hooks/useConnectionDetails';
import { AppConfig } from '@/lib/livekit/types';
// import { createClient } from '@/utils/supabase/client';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { Room, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const MotionWelcome = motion.create(Welcome);
const MotionSessionView = motion.create(SessionView);

interface AppProps {
    appConfig: AppConfig;
}

export default function CallApp({ appConfig }: AppProps) {
    // const supabase = createClient()
    const [UserId, setUserId] = useState("")
    const [isStartCallBtnLoad, setIsStartCallBtnLoad] = useState(false)

    const room = useMemo(() => new Room(), []);
    const [sessionStarted, setSessionStarted] = useState(false);
    const { refreshConnectionDetails, existingOrRefreshConnectionDetails } =
        useConnectionDetails(appConfig);

    const [openCallAccess, setOpenCallAccess] = useState(false);

    // const expireHandler = async (user_id: string) => {
    //     const response = await fetch('/api/subs-expire', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             user_id: user_id
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const resJson = await response.json()
    //     if (resJson.status !== 200) {
    //         console.error("error check expire")
    //     }
    // };

    // const authenticateAndSetUser = async (): Promise<string> => {
    //     try {
    //         const { data, error } = await supabase.auth.getUser();

    //         if (error || !data?.user) {
    //             setUserId("");
    //             return "";
    //         }

    //         const userId = data.user.id;
    //         setUserId(userId);
    //         await expireHandler(userId);

    //         return userId;
    //     } catch (err) {
    //         console.error("Auth error:", err);
    //         return "";
    //     }
    // };

    const handleStartCall = async () => {
        setIsStartCallBtnLoad(true);
        setSessionStarted(true)
        setIsStartCallBtnLoad(false);
        // try {
        //     const isTTSPlan = (await supabase.from('subscription').select(`plan(name),current_voice_token,end_at`)
        //         .eq("user_id", UserId)
        //         .eq("plan.name", "Plus")
        //         .single());
        //     const dateNow = new Date(Date.now()).toISOString();
        //     const isSubsExpired = dateNow > isTTSPlan.data?.end_at;

        //     if (UserId == "" || isTTSPlan.error?.code == "PGRST116" || isTTSPlan.data?.plan != null || isSubsExpired) {
        //         setOpenCallAccess?.(!openCallAccess);
        //     } else {
        //         setSessionStarted(true)
        //     }
        // } catch (error) {
        //     console.error('Error starting call:', error);
        // } finally {
        //     setIsStartCallBtnLoad(false); // Stop loading
        // }
    };


    useEffect(() => {
        const onDisconnected = () => {
            setSessionStarted(false);
            refreshConnectionDetails();
        };
        const onMediaDevicesError = (error: Error) => {
            toast.warning('Encountered an error with your media devices', {
                description: `${error.name}: ${error.message}`,
            })
        };
        room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
        room.on(RoomEvent.Disconnected, onDisconnected);
        return () => {
            room.off(RoomEvent.Disconnected, onDisconnected);
            room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
        };
    }, [room, refreshConnectionDetails]);


    useEffect(() => {
        let aborted = false;
        if (sessionStarted && room.state === 'disconnected') {
            Promise.all([
                room.localParticipant.setMicrophoneEnabled(true, undefined, {
                    preConnectBuffer: appConfig.isPreConnectBufferEnabled,
                }),
                existingOrRefreshConnectionDetails().then((connectionDetails) =>
                    room.connect(connectionDetails.serverUrl, connectionDetails.participantToken)
                ),
            ]).catch((error) => {
                if (aborted) {
                    // Once the effect has cleaned up after itself, drop any errors
                    //
                    // These errors are likely caused by this effect rerunning rapidly,
                    // resulting in a previous run `disconnect` running in parallel with
                    // a current run `connect`
                    return;
                }
                toast.warning('There was an error connecting to the agent', {
                    description: `${error.name}: ${error.message}`,
                })
            });
        }
        return () => {
            aborted = true;
            room.disconnect();
        };
    }, [room, sessionStarted, appConfig.isPreConnectBufferEnabled]);

    const { startButtonText } = appConfig;

    // useEffect(() => {
    //     const init = async () => {
    //         await authenticateAndSetUser();
    //     };

    //     init();
    // }, []);


    return (
        <main className='relative'>
            <MotionWelcome
                key="welcome"
                startButtonText={startButtonText}
                isStartCallBtnLoad={isStartCallBtnLoad}
                onStartCall={handleStartCall}
                disabled={sessionStarted}
                initial={{ opacity: 1 }}
                animate={{ opacity: sessionStarted ? 0 : 1 }}
                transition={{ duration: 0.5, ease: 'linear', delay: sessionStarted ? 0 : 0.5 }}
            />
            <RoomContext.Provider value={room}>
                <RoomAudioRenderer />
                <StartAudio label="Start Audio" />
                <MotionSessionView
                    key="session-view"
                    appConfig={appConfig}
                    disabled={!sessionStarted}
                    sessionStarted={sessionStarted}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: sessionStarted ? 1 : 0 }}
                    transition={{
                        duration: 0.5,
                        ease: 'linear',
                        delay: sessionStarted ? 0.5 : 0,
                    }}
                />
            </RoomContext.Provider>

            {/* CALL AKSES */}
            {/* <Dialog open={openCallAccess} onOpenChange={setOpenCallAccess}>
                <DialogContent>
                    <DialogHeader className='md:hidden'>
                        <DialogTitle>Tingkatkan Paket Biar Bisa <span className='text-primary'>Nelpon</span></DialogTitle>
                    </DialogHeader>

                    <div className='h-fit grid gap-4 justify-items-center items-center md:grid-cols-2'>
                        <Image
                            className="h-fit w-2/4 md:w-full rounded-md"
                            src="/assets/img/illustration/amelia/1.webp"
                            alt="Teh Ami"
                            width={1080}
                            height={1350}
                        />

                        <div className='h-full flex flex-col flex-1 justify-between gap-y-4 p-4 '>
                            <DialogTitle className='hidden md:block leading-6'>Tingkatkan Paket Biar Bisa <span className='text-primary'>Nelpon</span> Teh Ami</DialogTitle>

                            <DialogDescription>
                                Fitur ini eksklusif buat pengguna <span className='font-bold'>paket Akrab</span>.<br /><br />Langsung langganan dan rasain obrolan yang lebih dalem lewat suara yang hangat dan berasa deket banget.
                            </DialogDescription>

                            <DialogFooter className='justify-center!'>
                                <Button type="button" variant="default" asChild>
                                    <Link href="/pricing">Tingkatkan Paket</Link>
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
        </main>
    )
}