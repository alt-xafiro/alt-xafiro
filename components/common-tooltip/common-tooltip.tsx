'use client';

import { Tooltip } from 'react-tooltip';

export default function CommonTooltip() {
  return (
    <Tooltip
      className="!z-[9000] !max-w-[600px] !rounded-[16px] !bg-space-700/95 !text-base !transition-none !duration-0 h-md:!text-sm sm:!text-sm"
      anchorSelect=".tooltip"
      opacity={1}
      place="top"
      noArrow
      globalCloseEvents={{
        escape: true,
        scroll: true
      }}
      render={({ content }) => <div>{content}</div>}
    />
  );
}
