export default function CustomCursor({ dotRef }: { dotRef: React.RefObject<HTMLDivElement> }) {
  return <div ref={dotRef} className="cursor-dot" />;
}
