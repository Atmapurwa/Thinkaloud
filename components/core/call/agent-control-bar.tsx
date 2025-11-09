'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';
import { Track } from 'livekit-client';
import { BarVisualizer, useRemoteParticipants } from '@livekit/components-react';
// import { Button } from '@/components/ui/button';
// import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
// import { DeviceSelect } from '../device-select';
// import { TrackToggle } from '../track-toggle';
import { useAgentControlBar, UseAgentControlBarProps } from './hooks/use-agent-control-bar';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, icons, PhoneOff } from 'lucide-react';
import { TrackToggle } from './track-toggle';
import { DeviceSelect } from './device-select';
import { AppConfig } from '@/lib/livekit/types';
import { Progress } from '@/components/ui/progress';

export interface AgentControlBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
  UseAgentControlBarProps {
  dataQuestion: Array<{ question: string }>;
  onChatOpenChange?: (open: boolean) => void;
  onSendMessage?: (message: string) => Promise<void>;
  onDisconnect?: () => void;
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
}

/**
 * A control bar specifically designed for voice assistant interfaces
 */
export function AgentControlBar({
  dataQuestion,
  controls,
  saveUserChoices = true,
  // capabilities,
  className,
  onSendMessage,
  onChatOpenChange,
  onDisconnect,
  onDeviceError,
  ...props
}: AgentControlBarProps) {
  const participants = useRemoteParticipants();

  const isAgentAvailable = participants.some((p) => p.isAgent);

  const [isDisconnecting, setIsDisconnecting] = React.useState(false);

  const {
    micTrackRef,
    visibleControls,
    microphoneToggle,
    handleAudioDeviceChange,
    handleDisconnect,
  } = useAgentControlBar({
    controls,
    saveUserChoices,
  });

  const onLeave = async () => {
    setIsDisconnecting(true);
    await handleDisconnect();
    setIsDisconnecting(false);
    onDisconnect?.();
  };

  const onMicrophoneDeviceSelectError = useCallback(
    (error: Error) => {
      onDeviceError?.({ source: Track.Source.Microphone, error });
    },
    [onDeviceError]
  );

  // State for current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(dataQuestion.length - 1, prev + 1));
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / dataQuestion.length) * 100;

  return (
    <div
      aria-label="Voice assistant controls"
      className={cn(
        'bg-white dark:border-separator1 flex flex-col rounded-xl border p-6 drop-shadow-md/3 gap-y-6',
        className
      )}
      {...props}
    >

      <div>
        <p className='text-center text'>
          {dataQuestion[currentQuestionIndex].question}
        </p>
      </div>

      <div className="flex flex-row justify-between gap-1">

        <Button
          variant="outline"
          size="icon"
          aria-label="Go Back"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeftIcon />
        </Button>

        <div className="flex gap-1">
          {visibleControls.microphone && (
            <div className="flex items-center gap-0">
              <TrackToggle
                variant="outline"
                source={Track.Source.Microphone}
                pressed={microphoneToggle.enabled}
                disabled={microphoneToggle.pending}
                onPressedChange={microphoneToggle.toggle}
                className="peer/track group/track relative w-auto pr-3 pl-3 md:rounded-r-none md:border-r-0 md:pr-2"
              >
              </TrackToggle>
              <hr className="bg-separator1 peer-data-[state=off]/track:bg-separatorSerious relative z-10 -mr-px hidden h-4 w-px md:block" />
              <DeviceSelect
                size="sm"
                kind="audioinput"
                onMediaDeviceError={onMicrophoneDeviceSelectError}
                onActiveDeviceChange={handleAudioDeviceChange}
                className={cn([
                  'pl-2',
                  'peer-data-[state=off]/track:text-destructive-foreground',
                  'hover:text-fg1 focus:text-fg1',
                  'hover:peer-data-[state=off]/track:text-destructive-foreground focus:peer-data-[state=off]/track:text-destructive-foreground',
                  'hidden rounded-l-none md:block bg-muted',
                ])}
              />
            </div>
          )}
        </div>

        {/* Show leave button when at last question, otherwise show next button */}
        {currentQuestionIndex === dataQuestion.length - 1 ? (
          visibleControls.leave && (
            <Button
              variant="default"
              onClick={onLeave}
              disabled={isDisconnecting}
            >
              Submit
            </Button>
          )
        ) : (
          <Button
            variant="outline"
            size="icon"
            aria-label="Go Forward"
            onClick={handleNext}
          >
            <ArrowRightIcon />
          </Button>
        )}
      </div>


      <div className='grid gap-y-2'>
        <p className='text-center text-xs'>
          {currentQuestionIndex === dataQuestion.length - 1
            ? 'End Session'
            : `Next: ${dataQuestion[currentQuestionIndex + 1].question}`
          }
        </p>

        <div className='flex gap-x-2 items-center'>
          {currentQuestionIndex + 1}/{dataQuestion.length}
          <Progress value={progressPercentage} />
        </div>
      </div>


    </div>
  );
}
