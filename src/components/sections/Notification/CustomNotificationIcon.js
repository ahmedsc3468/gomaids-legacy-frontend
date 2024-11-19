import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

// Custom Badge Dot Styling
const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-dot": {
    minWidth: "10px",
    height: "10px",
    borderRadius: "50%",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)", // Adds depth
    transform: "translate(2px, -2px)", // Fine-tuning position
  },
}));

function CustomNotificationIcon({ notificationCount }) {
  return (
    <CustomBadge
      color="error"
      variant={notificationCount > 0 ? "standard" : "dot"}
      badgeContent={notificationCount > 0 ? notificationCount : null}
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <IconButton
        aria-label="Notifications"
        style={{
          backgroundColor: "#f5f5f5", // Subtle background for focus
          padding: "10px",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e0e0e0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f5f5f5")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="rgb(50, 56, 62)" // Consistent with brand color
          viewBox="0 0 256 256"
        >
          <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
        </svg>
      </IconButton>
    </CustomBadge>
  );
}

export default CustomNotificationIcon;
