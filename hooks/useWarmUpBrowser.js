<<<<<<< HEAD
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
=======
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
>>>>>>> b0b24aac08d76897c15b28629158f5c89f23ca64

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
<<<<<<< HEAD
  });
=======
  }, []);
>>>>>>> b0b24aac08d76897c15b28629158f5c89f23ca64
};
