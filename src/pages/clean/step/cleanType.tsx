import React from "react";
import { CardButton, Icons } from "@wematch/wematch-ui";
import { useDispatch, useSelector } from "react-redux";
import { setCleanType } from "store/clean/actions";
import * as cleanSelector from "store/clean/selectors";

const CleanType = () => {
  const dispatch = useDispatch();
  const cleanType = useSelector(cleanSelector.getCleanType);
  const handleSelectCleanType = (type?: "입주청소" | "거주청소") => {
    dispatch(setCleanType(type));
  };

  const steps = [
    { key: "clean_type_button_1", title: "입주/이사청소", desc: "입주 전 이사할 곳을 깨끗하게", defaultIcon: <Icons.DefaultCleanBefore />, selectedIcon: <Icons.SelectedCleanBefore />, value: "입주청소" },
    { key: "clean_type_button_2", title: "거주청소", desc: "입주 후 살고 있는 집을 새집처럼", defaultIcon: <Icons.DefaultCleanAfter />, selectedIcon: <Icons.SelectedCleanAfter width={56} />, value: "거주청소" }
  ];

  return (
    <>
      {steps.map((step: any) => {
        return <CardButton key={step.key} title={step.title} desc={step.desc} isSelected={cleanType === step.value} defaultIcon={step.defaultIcon} selectedIcon={step.selectedIcon} onClick={() => handleSelectCleanType(step.value)} />;
      })}
    </>
  );
};

export default CleanType;
