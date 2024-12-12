'use client';

import clsx from 'clsx';
import Image from 'next/image';

import projectStatusJson from '@/data/locales/project-status.json';
import projectTypeJson from '@/data/locales/project-type.json';

import {
  CustomComponentProps,
  ProjectData,
  ProjectStatus,
  ProjectType
} from '@/types';

import Stack from '@/components/stack/stack';
import SVGIcon from '@/components/svg-icon/svg-icon';

const projectStatusLocales = projectStatusJson as unknown as {
  [key in ProjectStatus]: string;
};

const projectTypeLocales = projectTypeJson as unknown as {
  [key in ProjectType]: string;
};

type ProjectProps = CustomComponentProps & {
  data: ProjectData;
};

export default function Project({ className, data }: ProjectProps) {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div
        className={clsx(
          className,
          'group/project relative h-[225px] w-full min-w-[312px] max-w-[480px] rounded-[24px] bg-space-800/40 text-space-700 shadow-2xl'
        )}
        tabIndex={0}
      >
        <PreviewImage
          className="h-full w-full rounded-[24px] object-cover transition-all group-focus-within/project:blur-[12px] group-focus-within/project:brightness-[0.7] group-hover/project:blur-[12px] group-hover/project:brightness-[0.7]"
          data={data}
        />

        <Links
          className="absolute left-1/2 top-1/2 hidden h-[48px] w-[160px] -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between group-focus-within/project:flex group-hover/project:flex h-md:h-[36px] h-md:w-[120px] sm:h-[36px] sm:w-[120px]"
          data={data}
        />

        <div className="absolute right-[12px] top-[12px] flex flex-row items-center justify-end space-x-4">
          <Type data={data} />
          <Status data={data} />
        </div>

        <Stack
          className="absolute bottom-[12px] right-[14px]"
          projectID={data.id}
          stackList={data.stackList}
        />
      </div>
      <h2 className="w-full pt-[0.375rem] text-center text-[1.375rem] leading-[1.875rem] h-md:text-xl sm:text-xl">
        {data.name}
      </h2>
    </div>
  );
}

type PreviewImageProps = CustomComponentProps & {
  data: ProjectData;
};

function PreviewImage({ className, data }: PreviewImageProps) {
  return (
    <picture>
      <source
        media="(min-resolution: 3dppx), (min-resolution: 288dpi)"
        srcSet={`/projects/${data.previewImage}@3x.png`}
      />
      <source
        media="(min-resolution: 2dppx), (min-resolution: 192dpi)"
        srcSet={`/projects/${data.previewImage}@2x.png`}
      />
      <Image
        className={clsx(
          className,
          data.centeredPreviewImage ? 'object-center' : 'object-top',
          data.id === 'alt-xafiro'
            ? 'shadow-[0px_-2px_3px_2px_rgba(0,0,0,0.7)]'
            : ''
        )}
        src={`/projects/${data.previewImage}.png`}
        alt={data.name}
        quality={95}
        fill
      />
    </picture>
  );
}

type ProjectLinksProps = CustomComponentProps & {
  data: ProjectData;
};

function Links({ className, data }: ProjectLinksProps) {
  return (
    <div className={className}>
      {data.previewURL !== null ? (
        <a
          href={data.previewURL}
          target="_blank"
          rel="noreferrer"
          className="tooltip"
          data-tooltip-content="Preview"
          data-tooltip-place="left"
        >
          <SVGIcon
            className="h-[48px] w-[64px] text-space-800 h-md:h-[28px] h-md:w-[48px] sm:h-[28px] sm:w-[48px]"
            icon="preview"
            theme={data.iconsTheme}
          />
          <span className="sr-only">Preview</span>
        </a>
      ) : (
        <div
          className="tooltip h-[48px] w-[64px] text-space-800 h-md:h-[36px] h-md:w-[48px] sm:h-[36px] sm:w-[48px]"
          tabIndex={0}
          data-tooltip-content={data.noPreviewURLComment}
          data-tooltip-place="left"
        >
          <SVGIcon
            className="h-full w-full"
            icon="no-preview"
            theme={data.iconsTheme}
          />
        </div>
      )}
      <div>
        <a
          href={data.sourceURL}
          target="_blank"
          rel="noreferrer"
          className="tooltip"
          data-tooltip-content="GitHub"
          data-tooltip-place="right"
        >
          <SVGIcon
            className="h-[48px] w-[48px] text-space-800 h-md:h-[36px] h-md:w-[36px] sm:h-[36px] sm:w-[36px]"
            icon="github"
            theme={data.iconsTheme}
          />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </div>
  );
}

type TypeProps = CustomComponentProps & {
  data: ProjectData;
};

function Type({ className, data }: TypeProps) {
  if (data.type === 'pet') {
    return null;
  }

  return (
    <div
      className={clsx(className, 'tooltip')}
      tabIndex={0}
      data-tooltip-content={projectTypeLocales[data.type]}
      data-tooltip-place="left"
    >
      <SVGIcon
        className="h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
        icon={data.type}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{projectTypeLocales[data.type]}</span>
    </div>
  );
}

type StatusProps = CustomComponentProps & {
  data: ProjectData;
};

function Status({ className, data }: StatusProps) {
  if (data.status === 'done') return null;

  return (
    <div
      className={clsx(className, 'tooltip')}
      tabIndex={0}
      data-tooltip-content={projectStatusLocales[data.status]}
      data-tooltip-place="right"
    >
      <SVGIcon
        className="h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
        icon={data.status}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{projectStatusLocales[data.status]}</span>
    </div>
  );
}
