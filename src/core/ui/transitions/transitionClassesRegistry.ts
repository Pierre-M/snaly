export interface TransitionClasses {
  "enter-from-class": string;
  "enter-to-class": string;
  "leave-from-class": string;
  "leave-to-class": string;
}

const transitions: Record<string, TransitionClasses> = {
  fade: {
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "leave-from-class": "opacity-100",
    "leave-to-class": "opacity-0",
  },
  "slide-from-bottom": {
    "enter-from-class": "transform opacity-0 translate-y-4",
    "enter-to-class": "transform opacity-100 translate-y-0",
    "leave-from-class": "transform opacity-100 translate-y-0",
    "leave-to-class": "transform opacity-0 translate-y-4",
  },
  "slide-from-top": {
    "enter-from-class": "transform opacity-0 -translate-y-4",
    "enter-to-class": "transform opacity-100 -translate-y-0",
    "leave-from-class": "transform opacity-100 -translate-y-0",
    "leave-to-class": "transform opacity-0 -translate-y-4",
  },
  collapse: {
    "enter-from-class": "duration-500 max-h-0 opacity-0 overflow-hidden",
    "enter-to-class": "duration-500 max-h-96 opacity-100 overflow-hidden",
    "leave-from-class": "duration-500 max-h-96 opacity-100 overflow-hidden",
    "leave-to-class": "duration-500 max-h-0 opacity-0 overflow-hidden",
  },
};

export default transitions;
