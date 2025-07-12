import React from "react";
import { Send, Image as ImageIcon, X, Upload, MessageSquare, Loader2 } from "lucide-react";

const SupportChatInput = ({
    inputText, setInputText, isSubmitting, handleSubmit,
    fileInputRef, handleImageSelect, imagePreview, removeImage, selectedImage, handleKeyPress
}: any) => (
    <div className="bg-white px-8 py-6 rounded-b-3xl">
        {imagePreview && (
            <div className="mb-4 relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                <button
                    type="button"
                    className="absolute cursor-pointer -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center"
                    onClick={removeImage}
                >
                    <X className="h-3 w-3" />
                </button>
            </div>
        )}
        <div className="flex items-end space-x-4">
            <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Describe your issue or question..."
                className="flex-1 min-h-[48px] max-h-[120px] resize-none border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 px-4 py-2 text-base"
                onKeyDown={handleKeyPress}
                disabled={isSubmitting}
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border cursor-pointer border-gray-200 bg-purple-50 hover:bg-purple-100 px-4 py-2 transition-colors"
                disabled={isSubmitting}
            >
                <ImageIcon className="h-6 w-6 text-purple-600" />
            </button>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={(!inputText.trim() && !selectedImage) || isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg disabled:opacity-50 transition-all"
            >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
                <Upload className="h-3 w-3" />
                <span>Upload images for visual support</span>
            </div>
            <div className="flex items-center space-x-1">
                <MessageSquare className="h-3 w-3" />
                <span>Describe your issue in detail</span>
            </div>
        </div>
    </div>
);
export default SupportChatInput;