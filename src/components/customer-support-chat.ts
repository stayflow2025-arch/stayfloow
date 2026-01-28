"use client";

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { X, Send, User, Loader2, MessageSquare } from 'lucide-react';
import { answerCustomerQuery } from '@/ai/flows/customer-support-flow';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const WELCOME_MESSAGE: Message = {
    role: 'model',
    content: 'Bonjour ! Je suis l\'assistant virtuel de StayFloow. Comment puis-je vous aider aujourd\'hui ?'
};

export function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message only on the client-side after initial mount to avoid hydration issues
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [isOpen]);


  const handleToggle = () => {
      setIsOpen(prev => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      const response = await answerCustomerQuery({
        question: input,
        chatHistory: newMessages,
      });
      const modelMessage: Message = { role: 'model', content: response.answer };
      setMessages(prev => [...prev, modelMessage]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages]);


  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", isOpen ? "scale-0" : "scale-100")}>
        <Button onClick={handleToggle} size="lg" className="rounded-full shadow-lg w-16 h-16">
          <MessageSquare className="h-7 w-7" />
        </Button>
      </div>

      <div className={cn("fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 ease-in-out", isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none')}>
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback><MessageSquare /></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">Assistant StayFloow</CardTitle>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    En ligne
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleToggle}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-hidden">
              <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
                <div className="space-y-4 pr-4">
                  {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-end gap-2", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                      {message.role === 'model' && (
                        <Avatar className="h-7 w-7">
                          <AvatarFallback><MessageSquare className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                      )}
                      <div className={cn("max-w-[80%] rounded-xl px-3 py-2 text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                        {message.content}
                      </div>
                       {message.role === 'user' && (
                        <Avatar className="h-7 w-7">
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isPending && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-7 w-7">
                            <AvatarFallback><MessageSquare className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl px-3 py-2 text-sm flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Tape...</span>
                        </div>
                     </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  disabled={isPending}
                />
                <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
      </div>
    </>
  );
}
