import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const getTimestamp = () => {
  if (typeof window !== "undefined") {
    return new Date().toLocaleTimeString();
  }
  return "";
};

const useSupportChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        type: "support",
        content: "👋 Hi, I'm Executive, your AI support assistant! How can I help you today?",
        timestamp: getTimestamp(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      Swal.fire({
        title: "Access Denied!",
        text: "You must be signed in to access customer support.",
        icon: "error",
      });
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!inputText.trim() && !selectedImage) return;
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputText.trim() || "Uploaded an image",
      timestamp: getTimestamp(),
      image: imagePreview || undefined
    };
    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      type: "support",
      content: "Analyzing your request...",
      timestamp: getTimestamp(),
      isLoading: true
    };
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsSubmitting(true);

    try {
      let imageBase64 = null;
      if (selectedImage) imageBase64 = await convertImageToBase64(selectedImage);
      const requestBody = {
        problemDescription: inputText.trim() || null,
        imageBase64,
        messageHistory: messages.map(msg => ({
          type: msg.type,
          content: msg.content,
          timestamp: msg.timestamp
        }))
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        let responseContent = "";
        if (data.success && data.textAnalysis != "Text processing failed") {
          if (data.textAnalysis && data.imageAnalysis) {
            responseContent = `Text Analysis:\n${data.textAnalysis}\n\nImage Analysis:\n${data.imageAnalysis}`;
          } else if (data.textAnalysis) {
            responseContent = data.textAnalysis;
          } else if (data.imageAnalysis) {
            responseContent = data.imageAnalysis;
          }
        } else {
          responseContent = data.message || "I apologize, but I encountered an error processing your request. Please try again.";
        }
        const responseMessage = {
          id: (Date.now() + 2).toString(),
          type: "support",
          content: responseContent,
          timestamp: getTimestamp(),
          textAnalysis: data.textAnalysis,
          imageAnalysis: data.imageAnalysis,
          error: !data.success
        };
        return [...withoutLoading, responseMessage];
      });
    } catch (error) {
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          type: "support",
          content: "I'm sorry, but I couldn't process your request due to a connection error.",
          timestamp: getTimestamp(),
          error: true
        };
        return [...withoutLoading, errorMessage];
      });
    } finally {
      setIsSubmitting(false);
      setInputText("");
      removeImage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return {
    messages, inputText, setInputText, isSubmitting, handleSubmit,
    fileInputRef, handleImageSelect, imagePreview, removeImage, selectedImage, handleKeyPress
  };
};
export default useSupportChat;