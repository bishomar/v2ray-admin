// @ts-check

import React from "react";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export function useOutsideAlerter(ref, callback) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
}

export function usePrompt() {
  return useCallback((message, okButton, onClick) => {
      let clicked = false;
      toast.custom(t => {
          return <div className={"ring-1 ring-black ring-opacity-20 whitespace-nowrap text-sm shadow-lg bg-white flex rounded-lg pointer-events-auto px-3 py-2"}>
              <span className="flex-1 self-center mr-3">{message}</span>
              <button className="rounded-lg duration-150 hover:shadow-md bg-blue-400 px-2 py-1 ml-1 text-white hover:bg-blue-900" onClick={() => { toast.remove(t.id); if (!clicked) onClick(); clicked = true;}}>{okButton}</button>
              <button className="rounded-lg duration-150 hover:shadow-md bg-slate-100 px-2 py-1 ml-1" onClick={() => toast.remove(t.id)}>Cancel</button>
          </div>
      })
  }, []);
}