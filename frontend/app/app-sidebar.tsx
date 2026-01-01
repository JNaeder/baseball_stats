import { Home, Inbox } from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Batters",
    url: "/batters",
    icon: Inbox,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Inbox,
  },
  {
    title: "Standings",
    url: "/standings",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col justify-center items-center mt-4">
          <Image
            src="/baseball_logo.png"
            alt="Baseball logo"
            width={50}
            height={50}
          />
          <div className="text-3xl text-center">John's Baseball Stuff</div>
        </div>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
