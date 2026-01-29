import UAParser from 'ua-parser-js';
import { TrackingData } from '../types';

export const getTrackingData = async (): Promise<TrackingData> => {
    // 1. UA Parser
    const parser = new UAParser();
    const uaResult = parser.getResult();

    // 2. UTM and Referrer
    const urlParams = new URLSearchParams(window.location.search);
    const utm = {
        source: urlParams.get('utm_source') || undefined,
        medium: urlParams.get('utm_medium') || undefined,
        campaign: urlParams.get('utm_campaign') || undefined,
        term: urlParams.get('utm_term') || undefined,
        content: urlParams.get('utm_content') || undefined,
    };
    const referrer = document.referrer;
    let referrerHostname = 'Direct';
    try {
        if (referrer) {
            referrerHostname = new URL(referrer).hostname;
        }
    } catch (e) {
        referrerHostname = referrer || 'Direct';
    }


    // 3. Geolocation via IP (with error handling)
    let locationData: any = {};
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
            locationData = await response.json();
        } else {
            console.warn(`IP API responded with status: ${response.status}`);
            locationData = { error: true, reason: "API request failed" };
        }
    } catch (error) {
        console.warn("Could not fetch IP location data:", error);
        locationData = { error: true, reason: "Fetch exception" };
    }

    return {
        device: {
            vendor: uaResult.device.vendor || null,
            model: uaResult.device.model || null,
            type: uaResult.device.type || 'unknown', // Set a default string to prevent 'undefined'
        },
        os: {
            name: uaResult.os.name,
            version: uaResult.os.version,
        },
        browser: {
            name: uaResult.browser.name,
            version: uaResult.browser.version,
        },
        utm,
        referrerInfo: {
            fullReferrer: referrer,
            hostname: referrerHostname,
        },
        location: {
            ip: locationData.ip || null,
            city: locationData.city || null,
            region: locationData.region || null,
            country_name: locationData.country_name || null,
            ...locationData
        },
    };
};