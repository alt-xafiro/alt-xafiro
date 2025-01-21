'use client';

import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

import { SHOWN_STACK_SIZE } from '@/consts';
import { getStack } from '@/model/stack';
import { getDataAttribute, getProjectDataById } from '@/utils';

import {
  CustomComponentProps,
  ProjectData,
  StackItem,
  StackLocales,
  StackType
} from '@/types';

import ExternalLink from '@/components/external-link/external-link';
import SvgIcon from '@/components/svg-icon/svg-icon';

type HiddenStackTooltipProps = CustomComponentProps & {
  projects: ProjectData[];
  stackLocales: StackLocales;
};

export default function HiddenStackTooltip({
  projects,
  stackLocales
}: HiddenStackTooltipProps) {
  return (
    <Tooltip
      className={clsx(
        '!z-[9000] !p-[20px] h-md:!p-[16px] sm:!p-[16px]',
        '!rounded-[24px] !bg-space-700/95 !text-base !transition-none !duration-0 h-md:!text-sm sm:!text-sm'
      )}
      anchorSelect=".hidden-stack-button"
      globalCloseEvents={{
        escape: true
      }}
      clickable
      offset={12}
      noArrow
      place="right"
      opacity={1}
      render={({ activeAnchor }) => {
        if (activeAnchor === null) return;

        const projectID = getDataAttribute(activeAnchor, 'project-id');

        const projectData = getProjectDataById(projects, projectID);

        if (!projectData) {
          return null;
        }

        const stackList = projectData.stackList;

        const hiddenStack = getStack(
          StackType.Hidden,
          stackList,
          SHOWN_STACK_SIZE
        );

        if (!hiddenStack) {
          return null;
        }

        return (
          <ul className="flex flex-col space-y-[16px] h-md:space-y-[12px] sm:space-y-[12px]">
            {hiddenStack.map((stackItem) => {
              return (
                <li
                  className="flex h-[32px] w-full flex-row items-center space-x-[12px] text-white h-md:h-[28px] h-md:space-x-[8px] sm:h-[28px] sm:space-x-[8px]"
                  key={stackItem.locale}
                >
                  {stackItem.link ? (
                    <ExternalLink
                      className="flex h-full w-full flex-row items-center space-x-[12px] h-md:space-x-[8px] sm:space-x-[8px]"
                      overwriteClassName={true}
                      href={stackItem.link}
                    >
                      <HiddenStackItem
                        data={stackItem}
                        locale={stackLocales[stackItem.locale]}
                      />
                    </ExternalLink>
                  ) : (
                    <>
                      <HiddenStackItem
                        data={stackItem}
                        locale={stackLocales[stackItem.locale]}
                      />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        );
      }}
    />
  );
}

type HiddenStackItemProps = CustomComponentProps & {
  data: StackItem;
  locale: string;
};

function HiddenStackItem({ data, locale }: HiddenStackItemProps) {
  return (
    <>
      <SvgIcon
        className="h-[32px] w-[32px] h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
        icon={data.icon}
      />
      <span>{locale}</span>
    </>
  );
}
