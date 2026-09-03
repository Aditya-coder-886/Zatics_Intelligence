"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, MessageCircle, Video, Mic, Users, X, Mail, CheckCircle2, Loader2, Calendar, Clock, Zap, BarChart3, FileText, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageType = 'user' | 'system' | 'automation';

interface Message {
  id: number;
  text: string;
  type: MessageType;
}

interface AutomationTask {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed';
  icon: React.ReactNode;
}

export default function MeetingRoom() {
  const params = useParams<{ roomId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = params.roomId;
  const meetingName = searchParams.get('name') || 'Untitled Meeting';
  const meetingDate = searchParams.get('date') || '';
  const meetingTime = searchParams.get('time') || '';
  const meetingAgenda = searchParams.get('agenda') || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [automationRunning, setAutomationRunning] = useState(false);
  const [activeAutomationTask, setActiveAutomationTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const automationTasks: AutomationTask[] = [
    { id: 'transcribe', label: 'Transcribing conversation', status: 'pending', icon: <FileText className="w-4 h-4" /> },
    { id: 'extract', label: 'Extracting action items', status: 'pending', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'schedule', label: 'Scheduling follow-up', status: 'pending', icon: <Calendar className="w-4 h-4" /> },
    { id: 'crm', label: 'Updating CRM', status: 'pending', icon: <Zap className="w-4 h-4" /> },
    { id: 'summary', label: 'Generating meeting summary', status: 'pending', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  // Generate share URL
  useEffect(() => {
    setShareUrl(`${window.location.origin}/meeting/${roomId}`);
  }, [roomId]);

  // Add initial system message
  useEffect(() => {
    const dateStr = meetingDate ? ` on ${meetingDate}` : '';
    const timeStr = meetingTime ? ` at ${meetingTime}` : '';
    setMessages([
      { id: 1, text: `Meeting "${meetingName}" started${dateStr}${timeStr}`, type: 'system' },
      { id: 2, text: 'AI Agent joined the meeting', type: 'system' },
      { id: 3, text: 'Initializing automation engine...', type: 'automation' },
    ]);
    setAutomationRunning(true);
  }, [roomId, meetingName, meetingDate, meetingTime]);

  // Simulate automation messages and task progress
  useEffect(() => {
    if (!automationRunning) return;

    let taskIndex = 0;
    const taskInterval = setInterval(() => {
      if (taskIndex < automationTasks.length) {
        const task = automationTasks[taskIndex];
        setActiveAutomationTask(task.id);
        setMessages(prev => [...prev, { id: Date.now(), text: `AI Agent: ${task.label}...`, type: 'automation' }]);
        taskIndex++;

        // Complete task after 3 seconds
        setTimeout(() => {
          setCompletedTasks(prev => [...prev, task.id]);
          setActiveAutomationTask(null);
          setMessages(prev => [...prev, { id: Date.now() + 1, text: `✓ ${task.label} completed`, type: 'system' }]);
        }, 3000);
      } else {
        // All tasks completed, restart cycle
        setTimeout(() => {
          setCompletedTasks([]);
          taskIndex = 0;
        }, 5000);
      }
    }, 4000);

    return () => clearInterval(taskInterval);
  }, [automationRunning]);

  // Random automation messages
  useEffect(() => {
    if (!automationRunning) return;

    const interval = setInterval(() => {
      const randomMessages = [
        'AI Agent: Monitoring conversation sentiment...',
        'AI Agent: Detecting key topics...',
        'AI Agent: Real-time translation active...',
        'AI Agent: Recording meeting for summary...',
        'AI Agent: Checking participant engagement...',
      ];
      const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessages(prev => [...prev, { id: Date.now(), text: randomMsg, type: 'automation' }]);
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [automationRunning]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("messageInput");
    if (!(input instanceof HTMLInputElement)) return;
    const text = input.value.trim();
    if (text) {
      setMessages(prev => [...prev, { id: Date.now(), text, type: 'user' }]);
      input.value = '';
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    if (videoRef.current) {
      if (videoEnabled) {
        videoRef.current.style.opacity = '0.3';
        videoRef.current.style.filter = 'grayscale(100%)';
      } else {
        videoRef.current.style.opacity = '1';
        videoRef.current.style.filter = 'grayscale(0%)';
      }
    }
  };

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
  };

  const leaveMeeting = () => router.push('/');

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  const sendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), text: `Invitation sent to ${inviteEmail}`, type: 'system' }
      ]);
      setInviteEmail('');
      setShowInviteModal(false);
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-md flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Meeting Room</h2>
          <button onClick={leaveMeeting} className="text-sm text-white/60 hover:text-white">
            Leave
          </button>
        </div>

        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <p className="text-sm text-white/80 mb-1">Meeting:</p>
          <p className="break-all text-xs font-mono text-white">{meetingName}</p>
        </div>

        {meetingDate && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-white/80 mb-1">Date:</p>
            <p className="text-xs text-white">{formatDate(meetingDate)}</p>
          </div>
        )}

        {meetingTime && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-white/80 mb-1">Time:</p>
            <p className="text-xs text-white">{formatTime(meetingTime)}</p>
          </div>
        )}

        {meetingAgenda && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-white/80 mb-1">Agenda:</p>
            <p className="text-xs text-white/80 break-words">{meetingAgenda}</p>
          </div>
        )}

        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <p className="text-sm text-white/80 mb-1">Room ID:</p>
          <p className="break-all text-xs font-mono text-white">{roomId}</p>
        </div>

        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <p className="text-sm text-white/80 mb-1">Shareable Link:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-white/40"
            />
            <button onClick={copyShareUrl} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <p className="text-sm text-white/80 mb-2">Automation Status</p>
          <div className="space-y-2">
            {automationTasks.map((task) => {
              const isRunning = activeAutomationTask === task.id;
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div key={task.id} className="flex items-center gap-2 text-xs">
                  <AnimatePresence mode="wait">
                    {isRunning && (
                      <motion.div
                        key="running"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
                      </motion.div>
                    )}
                    {isCompleted && (
                      <motion.div
                        key="completed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </motion.div>
                    )}
                    {!isRunning && !isCompleted && (
                      <motion.div
                        key="pending"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className={cn(
                    "text-white/70",
                    isCompleted && "text-emerald-400",
                    isRunning && "text-indigo-400"
                  )}>
                    {task.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-3 bg-white/5 rounded-lg">
          <p className="text-sm text-white/80 mb-2">Meeting Controls</p>
          <div className="flex items-center gap-3">
            <button onClick={toggleVideo} className="p-2 rounded hover:bg-white/10" aria-label={videoEnabled ? "Turn off camera" : "Turn on camera"}>
              <Video className={`w-4 h-4 ${videoEnabled ? "text-white" : "text-white/40"}`} />
            </button>
            <button onClick={toggleMic} className="p-2 rounded hover:bg-white/10" aria-label={micEnabled ? "Mute microphone" : "Unmute microphone"}>
              <Mic className={`w-4 h-4 ${micEnabled ? "text-white" : "text-white/40"}`} />
            </button>
            <button onClick={() => setShowInviteModal(true)} className="p-2 rounded hover:bg-white/10">
              <Users className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">{meetingName}</h1>
            <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 text-xs rounded-full">Live</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              Invite
            </button>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>👤 You</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>1 participant</span>
            </div>
          </div>
        </header>

        {/* Video Grid and Chat */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Grid */}
          <section className="flex-1 overflow-hidden relative bg-black/20">
            <div className="grid grid-cols-1 gap-4 p-6 h-full">
              {/* User Video */}
              <div ref={videoRef} className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent" />
                <div className="w-32 h-32 bg-indigo-600/20 rounded-full flex items-center justify-center mb-3 relative">
                  <Video className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-sm font-medium text-white">You</p>
                <p className="text-xs text-white/60">{videoEnabled ? 'Video On' : 'Video Off'}</p>
                {!videoEnabled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
                  >
                    <Video className="w-12 h-12 text-white/40" />
                  </motion.div>
                )}
              </div>

              {/* AI Agent */}
              <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center mb-3 relative">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-medium text-white">AI Agent</p>
                <p className="text-xs text-white/60">Assistant • Active</p>
                {activeAutomationTask && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center gap-1 text-xs text-indigo-400"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Chat Sidebar */}
          <aside className="w-72 bg-white/5 border-l border-white/10 backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Meeting Chat</h3>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Active
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4" ref={messageRef}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-3 p-3 rounded-lg max-w-[90%] ${msg.type === 'user' ? 'ml-auto bg-indigo-600/20' : msg.type === 'system' ? 'bg-white/10' : 'bg-white/5'}`}
                >
                  <p className={`text-sm break-words ${msg.type === 'user' ? 'text-white' : 'text-white/90'}`}>{msg.text}</p>
                  {msg.type === 'system' && (
                    <p className="text-xs text-white/50 mt-1">[System]</p>
                  )}
                  {msg.type === 'automation' && (
                    <p className="text-xs text-white/40 mt-1 italic">[AI Agent]</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t border-white/10">
              <input
                type="text"
                name="messageInput"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40"
              />
              <button type="submit" className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </aside>
        </div>

        {/* Footer Controls */}
        <footer className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span>🔒 End-to-end encrypted</span>
            <span>•</span>
            <span>📱 {roomId}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-white/10">
              <MessageCircle className="w-4 h-4 text-white/60" />
            </button>
            <button className="p-2 rounded hover:bg-white/10">
              <Video className="w-4 h-4 text-white/60" />
            </button>
            <button onClick={copyShareUrl} className="p-2 rounded hover:bg-white/10">
              <Copy className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </footer>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 border border-white/[0.15] rounded-2xl p-6 w-full max-w-md backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Invite Participants</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Share Link */}
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-white/80 mb-2">Share this link:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 text-xs bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                  />
                  <button onClick={copyShareUrl} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Email Invite */}
              <form onSubmit={sendInvite}>
                <p className="text-sm text-white/80 mb-2">Or invite by email:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/40"
                  />
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </form>
            </div>

            <p className="text-xs text-white/40 mt-4 text-center">
              Participants will be able to join the meeting directly
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}