import CallToAction from './components/call-to-action';
import SingleImage from './components/single-image';
import { PortableTextComponents } from '@portabletext/react';
import { portableTextHeadings } from './components/headings';

/** Legacy post content: video blokovi više nisu u šemi, ali stari dokumenti ih mogu imati. */
function LegacyVideoLink({ value }: { value: { title?: string; videoUrl?: string } }) {
  const url = value?.videoUrl;
  if (!url) return null;
  return (
    <p className="my-6 text-sm text-neutral-600">
      <a
        href={url}
        className="underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {value?.title?.trim() || 'Video (eksterni link)'}
      </a>
    </p>
  );
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    callToActionObject: (data) => {
      return <CallToAction data={data.value} />
    },
    singleImageObject: (data) => {
      return <SingleImage data={data.value}/>
    },
    videoObject: (data) => {
      return <LegacyVideoLink value={data.value} />
    }
  },
  block: {
    ...portableTextHeadings
  },
}
