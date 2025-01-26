import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler, Ref } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, SvgIcon } from '@shared/ui';

import { ProjectData } from '../../model/projects';

type LinksProps = CustomComponentProps & {
  ref?: Ref<HTMLDivElement>;
  data: ProjectData;
  onClick?: MouseEventHandler<HTMLDivElement>;
  locales: {
    data: {
      noPreview: string | null;
    };
    projectLinks: {
      preview: string;
      source: string;
    };
  };
};

export function Links({ className, ref, data, onClick, locales }: LinksProps) {
  return (
    <div className={clsx(className, 'cursor-pointer')} ref={ref}>
      {data.previewURL !== null ? (
        !data.previewInternal ? (
          <ExternalLink
            className="tooltip h-[48px] w-[64px] text-space-800 h-md:h-[28px] h-md:w-[48px] sm:h-[28px] sm:w-[48px]"
            resetStyles={true}
            href={data.previewURL}
            data-tooltip-content={locales.projectLinks.preview}
            data-tooltip-place="left"
          >
            <SvgIcon
              className="h-full w-full"
              icon="preview"
              theme={data.iconTheme}
            />
            <span className="sr-only">{locales.projectLinks.preview}</span>
          </ExternalLink>
        ) : (
          <Link
            className="tooltip h-[48px] w-[64px] text-space-800 h-md:h-[28px] h-md:w-[48px] sm:h-[28px] sm:w-[48px]"
            href={data.previewURL}
            data-tooltip-content={locales.projectLinks.preview}
            data-tooltip-place="left"
          >
            <SvgIcon
              className="h-full w-full"
              icon="preview"
              theme={data.iconTheme}
            />
            <span className="sr-only">{locales.projectLinks.preview}</span>
          </Link>
        )
      ) : (
        <div
          className="tooltip h-[48px] w-[64px] cursor-default text-space-800 h-md:h-[36px] h-md:w-[48px] sm:h-[36px] sm:w-[48px]"
          tabIndex={0}
          data-tooltip-content={locales.data.noPreview}
          data-tooltip-place="left"
        >
          <SvgIcon
            className="h-full w-full"
            icon="no-preview"
            theme={data.iconTheme}
          />
        </div>
      )}

      <div className="h-full flex-grow" onClick={onClick} />

      <ExternalLink
        className="tooltip h-[48px] w-[48px] text-space-800 h-md:h-[36px] h-md:w-[36px] sm:h-[36px] sm:w-[36px]"
        resetStyles={true}
        href={data.sourceURL}
        data-tooltip-content={locales.projectLinks.source}
        data-tooltip-place="right"
      >
        <SvgIcon
          className="h-full w-full"
          icon="github"
          theme={data.iconTheme}
        />
        <span className="sr-only">{locales.projectLinks.source}</span>
      </ExternalLink>
    </div>
  );
}
