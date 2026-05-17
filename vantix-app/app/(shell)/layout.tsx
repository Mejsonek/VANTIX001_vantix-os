import LeftThreeDimensionalDock from '@/components/shell/LeftThreeDimensionalDock';
import IsometricMetricLedger from '@/components/shell/IsometricMetricLedger';

export default function ShellLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen bg-void overflow-hidden">

      <LeftThreeDimensionalDock />


      <div className="flex-1 flex flex-col overflow-hidden relative">

        <div className="grain" />
        {children}
      </div>


      <IsometricMetricLedger />
    </div>
  );
}
