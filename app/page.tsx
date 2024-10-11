import { URLInput } from '@/components/url-input';
import { AnimationPreview } from '@/components/animation-preview';
import { ExportOptions } from '@/components/export-options';
import { UserGuide } from '@/components/user-guide';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Animation Copier</h1>
      <URLInput />
      <AnimationPreview />
      <ExportOptions />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Guide</h2>
        <UserGuide />
      </div>
    </div>
  );
}