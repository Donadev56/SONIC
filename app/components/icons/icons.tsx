type IconProps = {
    color?: string;
    fill?: string;
    height?: number;
    width?: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
  };
  
  // Dashboard Icon Component
  export const DashboardIcon = ({
    color,
    fill,
    size,
    className,
    height,
    width,
    strokeWidth,
  }: IconProps) => {
    const defaultSize = size || 24;
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize}
        viewBox="0 0 24 24"
        fill={fill || "none"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color || "currentColor"}
        className={className || "icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"}
        role="img"
        aria-label="Dashboard Icon"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
      </svg>
    );
  };
  
  // Chart Icon Component
  export const ChartIcon = ({
    color,
    fill,
    size,
    className,
    height,
    width,
  }: IconProps) => {
    const defaultSize = size || 24;
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize}
        viewBox="0 0 24 24"
        fill={fill || "#fff"}
        stroke={color || "none"}
        className={className || "icon icon-tabler icons-tabler-filled icon-tabler-chart-pie-3"}
        role="img"
        aria-label="Chart Icon"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 20.66a10 10 0 0 1 -11.328 -.917l6.742 -6.743h9.536a10 10 0 0 1 -4.95 7.66m-6 -18.61v9.534l-6.743 6.744a10 10 0 0 1 -2.257 -6.328l.005 -.324a10 10 0 0 1 8.995 -9.626m6 1.29a10 10 0 0 1 4.95 7.66h-8.95v-8.95a10 10 0 0 1 4 1.29" />
      </svg>
    );
  };
  
  // Users Icon Component
  export const UsersIcon = ({
    color,
    fill,
    size,
    className,
    height,
    width,
    strokeWidth,
  }: IconProps) => {
    const defaultSize = size || 24;
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize}
        viewBox="0 0 24 24"
        fill={fill || "none"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color || "#fff"}
        className={className || "icon icon-tabler icons-tabler-outline icon-tabler-users"}
        role="img"
        aria-label="Users Icon"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    );
  };
  

// Sonic Icon Component
export const SonicIcon = ({
    color,
    fill,
    size,
    className,
    height,
    width,
  }: IconProps) => {
    const defaultSize = size || 70; // Taille par défaut pour SonicIcon
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize * (57 / 179)} // Respecter le ratio
        viewBox="0 0 179 57"
        fill={fill || "none"}
        className={className || "icon icon-sonic"}
        role="img"
        aria-label="Sonic Icon"
      >
      
<g id="Frame 1116602412">
<g id="Logo">
<g id="Group 427319218">
<path id="Vector" d="M85.5553 27.0582C84.4963 26.5456 83.1437 26.2859 81.5383 26.2859H76.9702C75.7531 26.2859 74.7799 25.9472 74.0844 25.2946L74.0505 25.2608C73.3709 24.545 73.0434 23.7388 73.0434 22.7972C73.0434 21.8556 73.3821 20.9863 74.0505 20.2817C74.7234 19.5659 75.647 19.2046 76.785 19.2046H88.0257V16.7637H76.3673C75.1005 16.7637 74.0121 17.0572 73.0389 17.6556C72.0657 18.2246 71.3296 18.9585 70.7921 19.8933C70.2547 20.8304 69.9883 21.8217 69.9883 22.9327C69.9883 24.2356 70.266 25.3398 70.8192 26.2204C71.4131 27.1169 72.2012 27.7875 73.2241 28.2775C74.2876 28.7292 75.5499 28.9595 76.9702 28.9595H81.7753C82.5837 28.9595 83.3041 29.1446 83.9137 29.5127C84.537 29.8446 84.9999 30.3188 85.3069 30.9217C85.6073 31.4862 85.7473 32.0598 85.7473 32.7327C85.7473 33.4056 85.5824 34.0808 85.255 34.695C84.9276 35.3159 84.4241 35.833 83.767 36.2395C83.1505 36.6053 82.3963 36.7859 81.5428 36.7859H70.7267V39.2224H82.0576C83.4147 39.2224 84.5595 38.9175 85.5598 38.2921C86.6008 37.6598 87.3821 36.8717 87.9534 35.8669C88.5314 34.835 88.8069 33.7646 88.8069 32.5904C88.8069 31.2266 88.5179 30.0592 87.9579 29.1333C87.4318 28.2211 86.6437 27.5369 85.5576 27.0537L85.5508 27.0582H85.5553Z" fill="#F5F5F5"/>
<path id="Vector_2" d="M112.395 17.7868C110.641 16.7368 108.581 16.2017 106.278 16.2017C103.975 16.2017 101.92 16.7368 100.154 17.7913C98.3929 18.812 96.9794 20.2391 95.9497 22.032C94.92 23.7865 94.3984 25.7939 94.3984 27.9933C94.3984 30.1926 94.92 32.2226 95.9497 34.0042C96.9794 35.7633 98.3952 37.1904 100.154 38.2449C101.834 39.2271 103.799 39.7442 105.985 39.7849H106.278C108.581 39.7894 110.636 39.2768 112.395 38.2517C114.19 37.1971 115.604 35.77 116.606 34.0178C117.636 32.2294 118.158 30.2062 118.158 28.0023C118.158 25.7984 117.636 23.7391 116.606 21.9846C115.604 20.23 114.19 18.821 112.395 17.7959V17.7891V17.7868ZM115.051 28C115.051 29.7365 114.683 31.3329 113.953 32.7488C113.224 34.142 112.194 35.2642 110.898 36.0929C109.606 36.9171 108.005 37.3507 106.274 37.3507C104.542 37.3507 102.99 36.9284 101.649 36.0929C100.353 35.2642 99.3233 34.1375 98.5871 32.7442C97.8623 31.3352 97.4897 29.7388 97.4897 28.0023C97.4897 26.2659 97.8578 24.6875 98.5871 23.3055C99.3165 21.8784 100.353 20.7336 101.656 19.9049C102.99 19.0694 104.548 18.6539 106.274 18.6539C107.999 18.6539 109.584 19.0762 110.898 19.9117C112.201 20.7471 113.231 21.8852 113.96 23.301C114.685 24.6875 115.057 26.2659 115.057 28.0046H115.051V28Z" fill="#F5F5F5"/>
<path id="Vector_3" d="M140.814 17.4775C139.263 16.6375 137.436 16.2085 135.375 16.2085C133.313 16.2085 131.509 16.6375 129.924 17.4888C128.334 18.3062 127.117 19.4353 126.205 20.9233C125.333 22.4001 124.891 24.1546 124.891 26.1395V39.2317H127.948V26.1846C127.948 24.6514 128.294 23.3033 128.973 22.1856C129.675 21.0475 130.603 20.1624 131.73 19.5459C132.873 18.943 134.097 18.6382 135.375 18.6382C136.653 18.6382 137.865 18.943 138.974 19.5459C140.123 20.1556 141.052 21.0408 141.736 22.1901C142.443 23.3056 142.799 24.6424 142.799 26.1756V39.2227H145.861V26.1304C145.861 24.1524 145.403 22.3911 144.502 20.9143C143.619 19.4195 142.413 18.2972 140.817 17.4685L140.812 17.4753L140.814 17.4775Z" fill="#F5F5F5"/>
<path id="Vector_4" d="M157.005 16.7617H153.902V39.2272H157.005V16.7617Z" fill="#F5F5F5"/>
<path id="Vector_5" d="M171.176 20.404C172.54 19.6091 174.084 19.2027 175.778 19.2027H178.099V16.7617H175.92C173.583 16.7617 171.465 17.2698 169.643 18.2678C167.821 19.2614 166.36 20.6298 165.296 22.3278C164.244 23.9853 163.711 25.8911 163.711 27.9956C163.711 30.1001 164.244 32.0149 165.296 33.7085C166.355 35.3772 167.821 36.7253 169.643 37.7233C171.239 38.5904 174.364 39.2295 175.762 39.2295H178.099V36.7885H175.778C174.091 36.7885 172.54 36.4001 171.172 35.6324C169.846 34.8375 168.767 33.7604 167.967 32.4349C167.204 31.1049 166.814 29.6101 166.814 27.9911C166.814 26.372 167.204 24.8727 167.974 23.5427C168.767 22.224 169.848 21.1627 171.178 20.4017V20.4085L171.176 20.404Z" fill="#F5F5F5"/>
</g>
<g id="Vector_6">
<path d="M35.5379 35.0248C24.6296 38.2 15.606 42.8312 9.9576 48.2576L9.70823 48.4984C11.2102 49.876 12.8572 51.108 14.6375 52.1552L15.0203 51.7016C16.5629 49.876 18.2157 48.112 19.938 46.4488C24.56 41.9856 29.8488 38.1216 35.5437 35.0192L35.5379 35.0248Z" fill="url(#paint0_radial_1008_2751)"/>
<path d="M35.5379 35.0248C24.6296 38.2 15.606 42.8312 9.9576 48.2576L9.70823 48.4984C11.2102 49.876 12.8572 51.108 14.6375 52.1552L15.0203 51.7016C16.5629 49.876 18.2157 48.112 19.938 46.4488C24.56 41.9856 29.8488 38.1216 35.5437 35.0192L35.5379 35.0248Z" fill="#F5F5F5"/>
<path d="M0.789062 30.3207C1.224 35.9823 3.3929 41.1735 6.79703 45.3959L6.95361 45.2447C10.4505 41.9015 15.0029 38.8607 20.4947 36.2119C25.3081 33.8879 30.8347 31.8943 36.7905 30.3207H0.789062Z" fill="url(#paint1_radial_1008_2751)"/>
<path d="M0.789062 30.3207C1.224 35.9823 3.3929 41.1735 6.79703 45.3959L6.95361 45.2447C10.4505 41.9015 15.0029 38.8607 20.4947 36.2119C25.3081 33.8879 30.8347 31.8943 36.7905 30.3207H0.789062Z" fill="#F5F5F5"/>
<path d="M22.9884 7.05273C32.7484 16.4775 45.0311 22.7103 58.5027 25.0735C56.8789 11.1015 44.6078 0.231934 29.6981 0.231934C25.7604 0.231934 22.0083 0.993534 18.581 2.36553C19.9728 3.98953 21.4574 5.56873 22.9884 7.05273Z" fill="url(#paint2_radial_1008_2751)"/>
<path d="M22.9884 7.05273C32.7484 16.4775 45.0311 22.7103 58.5027 25.0735C56.8789 11.1015 44.6078 0.231934 29.6981 0.231934C25.7604 0.231934 22.0083 0.993534 18.581 2.36553C19.9728 3.98953 21.4574 5.56873 22.9884 7.05273Z" fill="#F5F5F5"/>
<path d="M9.9576 8.20635C15.606 13.6384 24.6296 18.264 35.5379 21.4448C29.843 18.3368 24.5542 14.4784 19.9322 10.0152C18.2157 8.35755 16.5629 6.59355 15.0145 4.76235L14.6318 4.30875C12.8514 5.35595 11.2044 6.58795 9.70823 7.96555L9.9576 8.20635Z" fill="url(#paint3_radial_1008_2751)"/>
<path d="M9.9576 8.20635C15.606 13.6384 24.6296 18.264 35.5379 21.4448C29.843 18.3368 24.5542 14.4784 19.9322 10.0152C18.2157 8.35755 16.5629 6.59355 15.0145 4.76235L14.6318 4.30875C12.8514 5.35595 11.2044 6.58795 9.70823 7.96555L9.9576 8.20635Z" fill="#F5F5F5"/>
<path d="M22.9884 49.4111C21.4516 50.8951 19.967 52.4743 18.581 54.0983C22.0025 55.4703 25.7604 56.2319 29.6981 56.2319C44.6078 56.2319 56.8789 45.3623 58.5085 31.3847C45.0369 33.7479 32.7542 39.9807 22.9942 49.4055L22.9884 49.4111Z" fill="url(#paint4_radial_1008_2751)"/>
<path d="M22.9884 49.4111C21.4516 50.8951 19.967 52.4743 18.581 54.0983C22.0025 55.4703 25.7604 56.2319 29.6981 56.2319C44.6078 56.2319 56.8789 45.3623 58.5085 31.3847C45.0369 33.7479 32.7542 39.9807 22.9942 49.4055L22.9884 49.4111Z" fill="#F5F5F5"/>
<path d="M20.4947 20.2519C15.0029 17.6031 10.4505 14.5623 6.95361 11.2191L6.79703 11.0679C3.3929 15.2903 1.224 20.4815 0.789062 26.1431H36.7847C30.8289 24.5695 25.3081 22.5759 20.4889 20.2463L20.4947 20.2519Z" fill="url(#paint5_radial_1008_2751)"/>
<path d="M20.4947 20.2519C15.0029 17.6031 10.4505 14.5623 6.95361 11.2191L6.79703 11.0679C3.3929 15.2903 1.224 20.4815 0.789062 26.1431H36.7847C30.8289 24.5695 25.3081 22.5759 20.4889 20.2463L20.4947 20.2519Z" fill="#F5F5F5"/>
</g>
</g>
</g>
<defs>
<radialGradient id="paint0_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
<radialGradient id="paint1_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
<radialGradient id="paint2_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
<radialGradient id="paint3_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
<radialGradient id="paint4_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
<radialGradient id="paint5_radial_1008_2751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.6488 28.2319) rotate(90) scale(28 28.8597)">
<stop stop-color="#1C294B"/>
<stop offset="0.317213" stop-color="#FF4433"/>
<stop offset="0.597213" stop-color="#FE9A4C"/>
<stop offset="1" stop-color="#E0E0E0"/>
</radialGradient>
</defs>
      </svg>
    );
  };

  export const User = ({color , fill , size , strokeWidth , width ,className , height }:IconProps)=> {
    const defaultSize = size || 50; // Taille par défaut pour SonicIcon

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize}
        viewBox="0 0 24 24"
        fill={fill || "none"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color || "currentColor"}
        className={className || "icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"}
        role="img"
        aria-label="Dashboard Icon"
      ><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
    )
  }


  export const MoneyIcon =({color , fill , size , strokeWidth , width ,className , height }:IconProps)=> {
    const defaultSize = size || 50; // Taille par défaut pour SonicIcon

    return (

        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || defaultSize}
        height={height || defaultSize}
        viewBox="0 0 24 24"
        fill={fill || "none"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color || "currentColor"}
        className={className || "icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"}
        role="img"
        aria-label="Dashboard Icon"
      ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5z" /><path d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /></svg>
    )
  }