import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import ConfigWizard from "@/components/hi/configurator/ConfigWizard";

const Configurator = () => (
  <ConfiguratorProvider>
    <ConfigWizard />
  </ConfiguratorProvider>
);

export default Configurator;
