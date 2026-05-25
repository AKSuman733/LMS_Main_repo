import { create } from "zustand";

const useLessonStore = create((set) => ({
  topic: "",

  celebrity: "",

  setTopic: (topic) =>
    set({
      topic,
    }),

  setCelebrity: (celebrity) =>
    set({
      celebrity,
    }),
}));

export default useLessonStore;