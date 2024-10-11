import React from 'react';
import { Radio} from 'lucide-react';
import Link from 'next/link';
import DiscordStatus from './Status';

const EmphasizedText = ({ children }) => (
  <span className="relative font-medium text-accent-foreground dark:text-primary group-hover:text-primary-dark transition-colors duration-300">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary opacity-50 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  </span>
);

const ExitText = ({ text }) => (
  <div className="relative flex flex-items justify-center h-8 overflow-hidden mt-4">
    <p 
      className="absolute text-sm font-bold text-muted-foreground dark:text-primary opacity-20 transform rotate-6 transition-all duration-300 hover:opacity-100 hover:scale-105"
      style={{ 
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        animation: 'float 3s ease-in-out infinite'
      }}
    >
      {text}
    </p>
  </div>
);

const Contact = () => {
    const status = DiscordStatus.useDiscordStatus();
  
    return (
      <div className="bg-transparent pt-4">
        <h2 className="text-xl font-bold mb-4 text-primary">Reach Me</h2>
        
        <p className="text-sm leading-relaxed text-muted-foreground mb-4 group">
          The fastest way to get a response is to shoot me a DM on
            <Link href="https://x.com/ignas_edwin" target="_blank" rel="noopener noreferrer">
                <EmphasizedText><span className="line-through"> Twitter</span> X</EmphasizedText>
            </Link> or <EmphasizedText>
            <Link href="https://discord.com/users/963425032426635345" target="_blank" rel="noopener noreferrer">
              Discord
            </Link>
          </EmphasizedText>.
        </p>
  
        <div className="bg-transparent rounded-lg p-2 max-w-sm">
          {status ? (
            <div className="flex items-center space-x-2 mb-4">
              <Radio className="text-primary" size={16} />
              <span className="text-sm text-muted-foreground">I am currently:</span>
              <DiscordStatus.PingingStatus status={status.discord_status} />
              <span className="text-base font-medium capitalize text-muted-foreground">
                {status.discord_status}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading Discord status...</p>
          )}
        </div>
  
        <p className="text-sm leading-relaxed text-muted-foreground mb-2 group">
          If you prefer to keep it formal, you can <EmphasizedText>
            <Link href="mailto:edwinngugi38@gmail.com">
              email me
            </Link>
          </EmphasizedText>. I&apos;ll get back to you ASAP.
        </p>
          
        <p className="text-sm leading-relaxed text-muted-foreground mt-4 mb-2 group">
        Feel free to reach out to share an idea, tell a joke, or simply say hello.
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground mt-4 mb-2 group">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities.
        </p>
  
        <ExitText text="!gnas..., adios!" />
  
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(13deg); }
            50% { transform: translateY(6px) rotate(13deg); }
            100% { transform: translateY(0px) rotate(13deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default Contact;  