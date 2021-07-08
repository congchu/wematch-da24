import React from 'react';
import {CardButton, Icons} from "@wematch/wematch-ui";

const CleanType = () => {
  const steps = [
    { title: '일반청소', desc: '합리적인 가격으로 만족스러운 청소', defaultIcon: <Icons.DefaultCleanBefore/>, selectedIcon: <Icons.SelectedCleanBefore />},
    { title: '프리미엄 청소', desc: '보이지않는 세균까지 완벽한 청소', defaultIcon: <Icons.DefaultCleanAfter/>, selectedIcon: <Icons.SelectedCleanAfter />}
    ];

  return (
      <>
        {steps.map((step: any) => {
          return (
            <CardButton title={step.title} desc={step.desc} isSelected={false} defaultIcon={step.defaultIcon} selectedIcon={step.selectedIcon} />
          )
        })}
      </>

  )
};

export default CleanType

