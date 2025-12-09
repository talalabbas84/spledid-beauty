"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
}

const botResponses: Record<string, string> = {
  shipping:
    "We offer free standard shipping on orders over $75. Standard shipping takes 5-7 business days, while express shipping (2-3 days) is available for $14.99.",
  returns:
    "We accept returns within 30 days of purchase. Items must be unopened and in original packaging. Contact us at support@splendidbeauty.com to initiate a return.",
  ingredients:
    "All our products use authentic African and Caribbean ingredients. Each product page lists both INCI names and plain language ingredients for transparency.",
  order:
    "To track your order, go to Order Tracking in the menu and enter your order ID. You'll receive tracking updates via email as well.",
  payment:
    "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
  default:
    "Thank you for reaching out! I'd be happy to help. You can ask me about shipping, returns, ingredients, orders, or payment options. For complex inquiries, our team is available at support@splendidbeauty.com",
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("ship") || lowerMessage.includes("delivery")) {
    return botResponses.shipping
  }
  if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
    return botResponses.returns
  }
  if (lowerMessage.includes("ingredient") || lowerMessage.includes("natural") || lowerMessage.includes("organic")) {
    return botResponses.ingredients
  }
  if (lowerMessage.includes("order") || lowerMessage.includes("track")) {
    return botResponses.order
  }
  if (lowerMessage.includes("pay") || lowerMessage.includes("card") || lowerMessage.includes("checkout")) {
    return botResponses.payment
  }
  return botResponses.default
}

export function LiveChat() {
  const { isLiveChatOpen, openLiveChat, closeLiveChat } = useStore()
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! Welcome to Splendid Beauty. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  if (!isLiveChatOpen) {
    return (
      <button
        onClick={openLiveChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 w-[360px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
        isMinimized ? "h-14" : "h-[500px]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Splendid Support</h3>
            <p className="text-xs opacity-80">We typically reply instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-primary-foreground/20 rounded">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={closeLiveChat} className="p-1 hover:bg-primary-foreground/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[360px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-2", message.type === "user" ? "justify-end" : "justify-start")}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md",
                  )}
                >
                  {message.content}
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
