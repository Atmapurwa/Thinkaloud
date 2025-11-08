import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2Icon, Phone } from 'lucide-react';

interface WelcomeProps {

    isStartCallBtnLoad?: boolean;
    disabled: boolean;
    startButtonText: string;
    onStartCall: () => void;
}

export const Welcome = ({
    isStartCallBtnLoad,
    disabled,
    startButtonText,
    onStartCall,
    ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {


    const Greeting = () => {
        var myDate = new Date();
        var hours = myDate.getHours();
        var greet;

        if (hours < 12)
            greet = "pagi";
        else if (hours >= 12 && hours <= 17)
            greet = "siang";
        else if (hours >= 17 && hours <= 24)
            greet = "malam";

        return <span>{greet}!</span>
    }



    return (
        <section
            ref={ref}
            inert={disabled}
            className={cn(
                'bg-transparent mx-auto flex h-svh flex-col items-center justify-center text-center space-y-4',
                disabled ? 'z-10' : 'z-20'
            )}
        >

            <Phone fill='currentColor' size={48} />

            <p className="text-center max-w-80 pt-1 leading-6">
                Selamat <Greeting /> Siap untuk berbicara dengan <span className='font-semibold'>Teh Ami</span>? <br />
            </p>
            <Button variant="default" size="lg" onClick={onStartCall} disabled={isStartCallBtnLoad} className="mt-6">
                {isStartCallBtnLoad ? <Loader2Icon className="animate-spin" /> : startButtonText}
            </Button>
            <div className="fixed bottom-6 max-w-sm text-muted-foreground font-encode-sans *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By using our services, you agree to Soulmi&apos;s <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.
            </div>
        </section>
    );
};
