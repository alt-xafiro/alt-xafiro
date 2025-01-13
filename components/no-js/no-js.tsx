export default function NoJs() {
  return (
    <noscript>
      <style>
        {`.no-js-motion {
            opacity: 1 !important;
            transform: none !important;
          }`}
      </style>
    </noscript>
  );
}
