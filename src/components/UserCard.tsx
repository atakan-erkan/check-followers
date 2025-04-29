import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AddEmoji from '../pages/icons/AddEmoji';

interface UserCardProps {
  username: string;
  note?: string;
  emoji?: string;
  onSaveNote?: (username: string, note: string) => void;
  onSaveEmoji?: (username: string, emoji: string) => void;
}

const EMOJI_LIST = ['😊', '😢', '😡', '😍', '🤔', '😴', '😎', '🤗', '😇', '😈'];

export default function UserCard({
  username,
  note = '',
  emoji = '',
  onSaveNote,
  onSaveEmoji
}: UserCardProps) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const { theme, language, translations } = useApp();

  const handleSaveNote = () => {
    if (onSaveNote) {
      onSaveNote(username, noteText);
    }
    setIsEditingNote(false);
  };

  const handleUsernameClick = () => {
    window.open(`https://www.instagram.com/${username}`, '_blank');
  };

  const handleEmojiClick = (newEmoji: string) => {
    setSelectedEmoji(newEmoji);
    if (onSaveEmoji) {
      onSaveEmoji(username, newEmoji);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`font-semibold cursor-pointer hover:text-yellow-500 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
          onClick={handleUsernameClick}
        >
          {username}
        </h3>
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
          >
            {selectedEmoji || <AddEmoji width={24} height={24} color={theme === 'dark' ? 'white' : 'black'} />}
          </button>
          {showEmojiPicker && (
            <div className={`absolute z-10 right-0 mt-2 p-2 rounded-lg shadow-lg w-48 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="grid grid-cols-4 gap-2">
                {EMOJI_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:scale-110 transition-transform p-1 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditingNote ? (
        <div className="mt-2">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveNote}
              className={`px-3 py-1 rounded cursor-pointer ${theme === 'dark' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-yellow-500 text-black hover:bg-yellow-600'
                }`}
            >
              {translations.saveNote[language]}
            </button>
            <button
              onClick={() => {
                setIsEditingNote(false);
                setNoteText(note);
              }}
              className={`px-3 py-1 rounded cursor-pointer ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
            >
              {translations.cancel[language]}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {note && (
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {note}
            </p>
          )}
          <button
            onClick={() => setIsEditingNote(true)}
            className={`mt-2 text-sm cursor-pointer ${theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'
              }`}
          >
            {note ? '✏️' : '📝'} {translations.addNote[language]}
          </button>
        </div>
      )}
    </div>
  );
}
