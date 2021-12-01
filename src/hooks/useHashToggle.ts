import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const useHashToggle = (hash: string): [boolean, React.Dispatch<boolean>] => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const history = useHistory();

  const toggleOpenModal = useCallback(
    (isToggle: boolean) => {
      if (isToggle) {
        history.push(hash);
      }
    },
    [isToggle]
  );

  useEffect(() => {
    if (isToggle) {
      toggleOpenModal(isToggle);
    } else {
      if (history.location.hash === hash) {
        history.goBack();
      }
    }
  }, [isToggle]);

  useEffect(() => {
    if (isToggle && !history.location.hash) {
      setIsToggle(false);
    }
  }, [history.location.hash]);

  return [isToggle, setIsToggle];
};

export default useHashToggle;
