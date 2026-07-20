import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import LuxuryPreview from "@/components/hi/configurator/LuxuryPreview";

const ConfigPreview = () => (
  <ConfiguratorProvider>
    <LuxuryPreview />
  </ConfiguratorProvider>
);

export default ConfigPreview;
