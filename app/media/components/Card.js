import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expand, Minimize } from 'lucide-react';


const ExpandedCard = ({ onContract, children }) => (
  <Card className="w-full h-full bg-card text-card-foreground border border-border rounded-lg shadow-lg overflow-hidden relative">
    <div className="p-6 h-full flex flex-col">
      <div className="flex-grow">{children}</div>
      <div className="absolute bottom-2 right-2">
        <Button variant="ghost" size="sm" onClick={onContract} className="text-muted-foreground hover:text-foreground">
          <Minimize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

export { CompactCard, ExpandedCard };