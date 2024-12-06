declare module "progress" {
    import { HTMLAttributes } from "react";
  
    export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
      value?: number;
      indicatorClassName?: string; // Custom prop
    }
  
    export const Progress: React.FC<ProgressProps>;
  }