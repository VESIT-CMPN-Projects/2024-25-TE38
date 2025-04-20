"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import useThemeStore from "@/store/store";
import { useState, useEffect } from "react";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { BiMessageSquareMinus } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { color, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import HelpCard from "./HelpCard";
import LogoText from "./LogoText";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "@/config/firebase-config";

interface Option {
  name: string;
  path: string;
}

const drawerVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

const options: Option[] = [
  { name: "Dashboard", path: "/student/dashboard" },
  { name: "Apply for Jobs", path: "/student/applyjob" },
  { name: "Job Recommendation", path: "/student/jobrecommendation" },
  { name: "Placement Statistics", path: "/student/placementstatistics" },
  { name: "trial", path: "/student/trial" },
  { name: "Messages", path: "/student/messages/inbox" },
  { name: "Profile", path: "/student/profile" },
  { name: "Settings", path: "/student/settings" },
  
];

const OptionsIcon = [
  <ImportContactsTwoToneIcon key="import-contacts" />,
  <BiCategoryAlt key="category-alt" />,
  <FaUserDoctor key="user-doctor" />,
  <BiMessageSquareMinus key="message-square-minus" />,
  <CiSettings key="settings" />,
];

export default function StudentSidebar({ isIcon }: any) {
  const router = useRouter();
  const { darkMode }: any = useThemeStore();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = useState(isLargeScreen);

  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLargeScreen]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      logout();
      console.log("User signed out");
      router.push("/authentication/studentLogin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: isLargeScreen ? 220 : 240 }}
      role="presentation"
      className="h-full flex flex-col bg-white dark:bg-dark_main_background"
    >
      <LogoText />
      <div className="flex flex-col justify-between items-center h-full dark:bg-dark_main_background dark:text-white">
        <div className="w-full mr-2">
          <List>
            {options.map((option, index) => (
              <ListItem key={option.name} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: "0 10px 10px 0",
                    margin: "5px 5px 5px 0",
                    border: "1px solid #E5E5E5",
                    ...(darkMode && {
                      border: "1px solid #06AED5",
                    }),
                    ":hover": {
                      color: "#06AED5",
                      border: "1px solid #06AED5",
                    },
                    ":active": {
                      color: "#06AED5",
                    },
                  }}
                  onClick={() => router.push(option.path)}
                >
                  <ListItemIcon
                    sx={{
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    {OptionsIcon[index]}
                  </ListItemIcon>
                  {!isIcon && <ListItemText sx={{}} primary={option.name} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        {/* <div className="p-2 h-full flex items-center justify-center">
          <HelpCard />
        </div> */}
        <Button
          className=" text-light_primary_background border-light_primary_background border-2  dark:hover:text-red-500"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Box>
  );

  return (
    <div className="flex overflow-hidden">
      {!isLargeScreen && (
        <IconButton onClick={toggleDrawer(!open)}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant={isLargeScreen ? "persistent" : "temporary"}
        sx={{
          width: isLargeScreen ? 220 : 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isLargeScreen ? 220 : 240,
            boxSizing: "border-box",
          },
        }}
      >
        <motion.div
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={drawerVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            height: "100%",
            width: isLargeScreen ? 220 : 240,
            overflow: "hidden",
          }}
        >
          {DrawerList}
        </motion.div>
      </Drawer>
    </div>
  );
}
