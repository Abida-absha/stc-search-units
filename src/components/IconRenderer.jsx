import * as Icons from 'lucide-react';

const IconRenderer = ({ iconName, className = "w-4 h-4", ...props }) => {
  const Icon = Icons[iconName];

  if (!Icon) {
    // Fallback to Box icon if icon name not found
    const FallbackIcon = Icons.Box;
    return <FallbackIcon className={className} {...props} />;
  }

  return <Icon className={className} {...props} />;
};

export default IconRenderer;
