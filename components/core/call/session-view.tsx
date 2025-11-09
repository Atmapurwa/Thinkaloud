'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    type AgentState,
    BarVisualizer,
    useRoomContext,
    useVoiceAssistant,
} from '@livekit/components-react';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { AgentControlBar } from './agent-control-bar';
import { AppConfig } from '@/lib/livekit/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

function isAgentAvailable(agentState: AgentState) {
    return agentState == 'listening' || agentState == 'thinking' || agentState == 'speaking';
}

interface SessionViewProps {
    appConfig: AppConfig;
    disabled: boolean;
    sessionStarted: boolean;
}

export const SessionView = ({
    disabled,
    sessionStarted,
    ref,
}: React.ComponentProps<'div'> & SessionViewProps) => {
    const { state: agentState, audioTrack: agentAudioTrack } = useVoiceAssistant();
    const room = useRoomContext();

    useDebugMode({
        enabled: process.env.NODE_END !== 'production',
    });

    const data = [
        { question: 'Name three things that plants need to grow. Explain why each one is important.;', no: 1 },
        { question: 'Water can be a solid, liquid, or gas. Give an example of when you see water in each of these forms.', no: 2 },
        { question: 'Why is it important to reduce, reuse, and recycle? Give two examples of how you can help protect the Earth.', no: 3 },
    ];

    useEffect(() => {
        if (sessionStarted) {
            const timeout = setTimeout(() => {
                if (!isAgentAvailable(agentState)) {
                    const reason =
                        agentState === 'connecting'
                            ? 'Agent did not join the room. '
                            : 'Agent connected but did not complete initializing. ';

                    toast.info('Session ended', {
                        description: reason + 'Please try again.',
                    });
                    room.disconnect();
                }
            }, 20_000);

            return () => clearTimeout(timeout);
        }
    }, [agentState, sessionStarted, room]);

    return (
        <section
            ref={ref}
            inert={disabled}
            className={cn(
                'opacity-0',
                'absolute inset-0 z-50 flex flex-col items-center px-5 overflow-y-auto py-10',
                // prevent page scrollbar
                // when !chatOpen due to 'translate-y-20'
                // !chatOpen && 'max-h-svh overflow-hidden'
            )}
        >

            <h2 className='font-bold text-2xl mb-2 text-center'>Learning About Nature and the Earth</h2>
            <Dialog>
                <DialogTrigger asChild className='mb-4'>
                    <Button size={'sm'} variant="outline" className='text-xs'>
                        <Info className='size-3' />
                        Details
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Judul assignment</DialogTitle>
                        <DialogDescription>
                            {data.map((item) => (
                                <div key={item.no} className="mb-2">
                                    <p><span className='font-bold'>{item.no}.</span> {item.question}</p>
                                </div>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className='flex h-fit w-full justify-center items-center mb-18'>
                <BarVisualizer
                    barCount={1}
                    state={agentState}
                    options={{ minHeight: 5 }}
                    trackRef={agentAudioTrack}
                    className={cn('flex aspect-video w-80 items-center justify-center gap-1')}
                >
                    <span
                        className={cn([
                            'bg-primary/15 min-h-48 w-48 rounded-full',
                            'origin-center transition-colors duration-250 ease-linear',
                            'data-[lk-highlighted=true]:bg-primary data-[lk-muted=true]:bg-primary/15',
                        ])}
                    />
                </BarVisualizer>
            </div>


            <div className="flex flex-col z-50 h-[152px] w-full mb-9">

                <motion.div
                    key="control-bar"
                    initial={{ opacity: 0, translateY: '100%' }}
                    animate={{
                        opacity: sessionStarted ? 1 : 0,
                        translateY: sessionStarted ? '0%' : '100%',
                    }}
                    transition={{ duration: 0.3, delay: sessionStarted ? 0.5 : 0, ease: 'easeOut' }}
                >
                    <div className="z-10 w-full max-w-[500px] mx-auto">

                        <AgentControlBar
                            dataQuestion={data}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
