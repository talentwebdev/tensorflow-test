export const GTM_US = `
    <!-- US GTM Snippet - 12/04/2018 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=DC-8467884"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'DC-8467884');
    </script>

    <script>
        gtag('event', 'conversion', {
            'allow_custom_scripts': true,
            'send_to': 'DC-8467884/stufi0/oreos0+standard'
        });
    </script>
    <!-- End GTM Snippet-->
`;

export const GTM_CA = `
    <!-- CA GTM Snippet - 12/04/2018 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=DC-8445875"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'DC-8445875');
    </script>

    <script>
        gtag('event', 'conversion', {
            'allow_custom_scripts': true,
            'send_to': 'DC-8445875/stufi0/oreoc0+standard'
        });
    </script>
    <noscript>
        <img src="https://ad.doubleclick.net/ddm/activity/src=8445875;type=stufi0;cat=oreoc0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1?" width="1" height="1" alt="" />
    </noscript>
    <!-- End GTM Snippet-->
`;
