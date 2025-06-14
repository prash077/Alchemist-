
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, X, ExternalLink, Share, Mail, FileText } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';

interface ActNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'linkedin' | 'email' | 'notion';
  insightData: {
    title: string;
    summary: string;
    category: string;
    source: string;
  };
}

const actionConfigs = {
  linkedin: {
    title: '📢 Draft LinkedIn Post',
    icon: Share,
    color: 'from-blue-500 to-blue-600',
    template: (data: any) => `🚀 Interesting development in ${data.category}:

${data.title}

Key insight: ${data.summary}

What do you think this means for the industry? 

#startup #${data.category.toLowerCase()} #innovation

Source: ${data.source}`
  },
  email: {
    title: '✉️ VC Outreach Email',
    icon: Mail,
    color: 'from-green-500 to-green-600',
    template: (data: any) => `Subject: Market intelligence update - ${data.category}

Hi [VC Name],

I wanted to share a relevant market development that caught my attention:

${data.title}

${data.summary}

This aligns with trends we've been discussing regarding [your startup focus]. I'd love to get your perspective on how this might impact the investment landscape.

Looking forward to our next conversation.

Best regards,
[Your Name]

P.S. Source: ${data.source}`
  },
  notion: {
    title: '🗂 Add to Notion',
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    template: (data: any) => `# ${data.title}

**Category:** ${data.category}
**Source:** ${data.source}
**Date:** ${new Date().toLocaleDateString()}

## Summary
${data.summary}

## Action Items
- [ ] Research related companies
- [ ] Analyze competitive landscape
- [ ] Consider implications for our strategy

## Tags
#market-intel #${data.category.toLowerCase()} #startup-digest`
  }
};

export const ActNowModal: React.FC<ActNowModalProps> = ({ isOpen, onClose, action, insightData }) => {
  const [copied, setCopied] = useState(false);
  const [executed, setExecuted] = useState(false);
  const { incrementExecutions, addXP } = useGamification();

  if (!isOpen) return null;

  const config = actionConfigs[action];
  const Icon = config.icon;
  const content = config.template(insightData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleExecute = () => {
    setExecuted(true);
    incrementExecutions();
    addXP(75);
    
    // Confetti animation effect
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
      createConfetti();
    }
    
    setTimeout(() => {
      onClose();
      setExecuted(false);
    }, 2000);
  };

  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)]};
      top: 50%;
      left: 50%;
      z-index: 9999;
      pointer-events: none;
      border-radius: 50%;
    `;
    
    document.body.appendChild(confetti);
    
    const xVel = (Math.random() - 0.5) * 20;
    const yVel = Math.random() * -15 - 5;
    let x = 0, y = 0, gravity = 0.5, fade = 1;
    
    const animate = () => {
      y += yVel;
      x += xVel;
      fade -= 0.02;
      
      confetti.style.transform = `translate(${x}px, ${y}px)`;
      confetti.style.opacity = fade.toString();
      
      if (fade > 0) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(confetti);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-hidden">
        <CardHeader className={`bg-gradient-to-r ${config.color} text-white`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Icon className="w-6 h-6" />
              {config.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Based on insight:</h3>
            <h4 className="text-sm font-medium text-slate-700">{insightData.title}</h4>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">{insightData.category}</Badge>
              <Badge variant="outline" className="text-xs">{insightData.source}</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-slate-800">Generated Content:</h3>
            <div className="bg-white border border-slate-200 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                {content}
              </pre>
            </div>
          </div>

          {executed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Action Executed! +75 XP</p>
              <p className="text-green-600 text-sm">Great job taking action on this insight!</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1"
              disabled={executed}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Content
                </>
              )}
            </Button>
            
            <Button
              onClick={handleExecute}
              className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90`}
              disabled={executed}
            >
              {executed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Executed!
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Execute Action
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
