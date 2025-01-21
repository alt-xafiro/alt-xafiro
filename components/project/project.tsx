'use client';

import clsx from 'clsx';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, Ref, useEffect, useRef, useState } from 'react';

import {
  CustomComponentProps,
  ProjectData,
  ProjectLocales,
  StackLocales
} from '@/types';

import ExternalLink from '@/components/external-link/external-link';
import Stack from '@/components/stack/stack';
import SvgIcon from '@/components/svg-icon/svg-icon';

type ProjectProps = CustomComponentProps & {
  data: ProjectData;
  locales: {
    project: ProjectLocales;
    stack: StackLocales;
  };
};

export default function Project({ className, data, locales }: ProjectProps) {
  const [active, setActive] = useState<boolean>(false);

  const previewRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const typeStatusRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const toggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent | TouchEvent) => {
      if (!active) return;

      if (
        [previewRef, linksRef, typeStatusRef, stackRef].every(
          (el) => el.current && !el.current.contains(evt.target as Node)
        )
      ) {
        setActive(false);
      }
    };

    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        if (!active) return;

        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [active]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <motion.div
        className={clsx(
          className,
          'group/project relative h-[225px] w-full min-w-[312px] max-w-[480px]',
          'rounded-[24px] bg-space-800/40 text-space-700 shadow-2xl'
        )}
        whileHover={{ scale: 1.03 }}
      >
        <button
          className="relative h-full w-full cursor-pointer"
          type="button"
          ref={previewRef}
          onClick={() => toggleActive()}
        >
          <PreviewImage
            className={clsx(
              active
                ? 'blur-[8px] brightness-[0.7]'
                : 'blur-0 brightness-100 group-hover/project:brightness-[1.13]',
              'rounded-[24px] transition-all'
            )}
            data={data}
            alt={locales.project.data.name}
          />
        </button>

        <Links
          className={clsx(
            active ? 'flex' : 'hidden',
            'absolute left-1/2 top-1/2 h-[48px] w-[160px] -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between h-md:h-[36px] h-md:w-[120px] sm:h-[36px] sm:w-[120px]'
          )}
          ref={linksRef}
          data={data}
          onClick={() => toggleActive()}
          locales={{
            data: {
              noPreview: locales.project.data.noPreview
            },
            projectLinks: {
              preview: locales.project.projectLinks.preview,
              source: locales.project.projectLinks.source
            }
          }}
        />

        <div
          className="absolute right-[12px] top-[12px] flex cursor-pointer flex-row items-center justify-end space-x-4"
          ref={typeStatusRef}
          onClick={() => toggleActive()}
        >
          <Type data={data} typeLocale={locales.project.data.type} />
          <Status data={data} statusLocale={locales.project.data.status} />
        </div>

        <Stack
          className="absolute bottom-[12px] right-[14px]"
          ref={stackRef}
          projectID={data.id}
          stackList={data.stackList}
          stackLocales={locales.stack}
        />
      </motion.div>
      <h2 className="w-full pt-[0.375rem] text-center text-[1.375rem] leading-[1.875rem] h-md:text-xl sm:text-xl">
        {locales.project.data.name}
      </h2>
    </div>
  );
}

type PreviewImageProps = CustomComponentProps & {
  data: ProjectData;
  alt: string;
};

function PreviewImage({ className, data, alt }: PreviewImageProps) {
  return (
    <Image
      className={clsx(
        className,
        'h-auto w-full object-cover',
        data.centeredPreviewImage ? 'object-center' : 'object-top',
        data.id === 'alt-xafiro' && 'shadow-[0px_-2px_3px_2px_rgba(0,0,0,0.7)]'
      )}
      src={`/projects/images/${data.previewImage}.png`}
      alt={alt}
      quality={95}
      priority={true}
      fill
      sizes="480px, (min-resolution: 2dppx) 960px, (min-resolution: 192dpi) 960px, (min-resolution: 3dppx) 1440px, (min-resolution: 288dpi) 1440px"
    />
  );
}

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

function Links({ className, ref, data, onClick, locales }: LinksProps) {
  return (
    <div className={clsx(className, 'cursor-pointer')} ref={ref}>
      {data.previewURL !== null ? (
        !data.previewInternal ? (
          <ExternalLink
            className="tooltip h-[48px] w-[64px] text-space-800 h-md:h-[28px] h-md:w-[48px] sm:h-[28px] sm:w-[48px]"
            overwriteClassName={true}
            href={data.previewURL}
            data-tooltip-content={locales.projectLinks.preview}
            data-tooltip-place="left"
          >
            <SvgIcon
              className="h-full w-full"
              icon="preview"
              theme={data.iconsTheme}
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
              theme={data.iconsTheme}
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
            theme={data.iconsTheme}
          />
        </div>
      )}
      <div className="h-full flex-grow" onClick={onClick} />
      <ExternalLink
        className="tooltip h-[48px] w-[48px] text-space-800 h-md:h-[36px] h-md:w-[36px] sm:h-[36px] sm:w-[36px]"
        overwriteClassName={true}
        href={data.sourceURL}
        data-tooltip-content={locales.projectLinks.source}
        data-tooltip-place="right"
      >
        <SvgIcon
          className="h-full w-full"
          icon="github"
          theme={data.iconsTheme}
        />
        <span className="sr-only">{locales.projectLinks.source}</span>
      </ExternalLink>
    </div>
  );
}

type TypeProps = CustomComponentProps & {
  data: ProjectData;
  typeLocale: string;
};

function Type({ className, data, typeLocale }: TypeProps) {
  if (data.type === 'pet') {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        'tooltip h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]'
      )}
      tabIndex={0}
      data-tooltip-content={typeLocale}
      data-tooltip-place="left"
    >
      <SvgIcon
        className="h-full w-full"
        icon={data.type}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{typeLocale}</span>
    </div>
  );
}

type StatusProps = CustomComponentProps & {
  data: ProjectData;
  statusLocale: string;
};

function Status({ className, data, statusLocale }: StatusProps) {
  if (data.status === 'done') return null;

  return (
    <div
      className={clsx(
        className,
        'tooltip h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]'
      )}
      tabIndex={0}
      data-tooltip-content={statusLocale}
      data-tooltip-place="right"
    >
      <SvgIcon
        className="h-full w-full"
        icon={data.status}
        theme={data.iconsTheme}
      />
      <span className="sr-only">{statusLocale}</span>
    </div>
  );
}
