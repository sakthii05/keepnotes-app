import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: string;
  content: string;
  title:string;
  ownerid: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.content = action.payload.content;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;

