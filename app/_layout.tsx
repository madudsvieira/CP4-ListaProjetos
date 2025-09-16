import React, { ReactNode } from "react";
import { View } from "react-native";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <View style={{ flex: 1 }}>{children}</View>;
}
