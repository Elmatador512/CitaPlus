var capacitorLevelPlayAds = (function (exports, core) {
    'use strict';

    /**
     * Built-in English copy for the custom consent modal. Every other locale and
     * every per-publisher override is merged over this bundle, so it doubles as the
     * fallback for any missing key.
     *
     * UI strings support `{var}` interpolation (e.g. `{appName}`, `{count}`).
     * The catalogues (purposes, technologies, dataCategories, legalBases,
     * retention, countries) and the per-service descriptions are transcribed from
     * the reference CMP and cover the services in `consent/services.example.json`.
     */
    const en = {
        ui: {
            // First layer
            'firstLayer.title': '{appName} asks for your consent to use your personal data to:',
            'firstLayer.body': 'Your personal data will be processed and information from your device (cookies, ' +
                'unique identifiers and other device data) may be stored by, accessed by and shared ' +
                'with {count} partners or used specifically by this app. We and our partners may use ' +
                'precise geolocation data.',
            'firstLayer.partners': 'List of partners.',
            'firstLayer.legInt': 'Some vendors may process your personal data on the basis of legitimate interest, ' +
                'which you can object to by managing your options below.',
            // Manage layer
            'manage.title': 'Manage your data',
            'manage.subtitle': 'You can choose how your personal data is used.',
            'tab.categories': 'Categories',
            'tab.services': 'Services',
            // Buttons
            'btn.consent': 'Consent',
            'btn.manage': 'Manage options',
            'btn.acceptAll': 'Accept all',
            'btn.confirm': 'Confirm choices',
            // Links
            'link.privacyPolicy': 'Privacy Policy',
            'link.legalNotice': 'Legal Notice',
            'link.privacyPolicyOf': 'Privacy policy',
            'link.cookiePolicyOf': 'Cookie policy',
            'link.optOutOf': 'Opt out',
            // Detail section headers + hints
            'section.description': 'Description of Service',
            'section.company': 'Processing Company',
            'section.purposes': 'Data Purposes',
            'section.purposes.hint': 'This list represents the purposes of the data collection and processing.',
            'section.technologies': 'Technologies Used',
            'section.technologies.hint': 'This list represents all technologies this service uses to collect data.',
            'section.dataCollected': 'Data Collected',
            'section.dataCollected.hint': 'This list represents all (personal) data that is collected by or through the use of this service.',
            'section.legalBasis': 'Legal Basis',
            'section.legalBasis.hint': 'In the following the required legal basis for the processing of data is listed.',
            'section.location': 'Location of Processing',
            'section.retention': 'Retention Period',
            'section.transfer': 'Transfer to Third Countries',
            'section.transfer.hint': 'This service may forward the collected data to a different country. Please note that this ' +
                'service might transfer the data to a country without the required data protection standards. ' +
                'Below you can find a list of countries to which the data is being transferred. For more ' +
                "information regarding safeguards please refer to the provider's privacy policy or contact " +
                'the provider directly.',
            'section.recipients': 'Data Recipients',
        },
        categories: {
            marketing: {
                name: 'Marketing',
                description: 'These technologies are used by advertisers to serve ads that are relevant to your interests.',
            },
            functional: {
                name: 'Functional',
                description: 'These technologies enable us to analyse usage behavior in order to measure and improve performance.',
            },
            essential: {
                name: 'Essential',
                description: 'These technologies are required to activate the core functionality of our service.',
            },
        },
        purposes: {
            advertisement: 'Advertisement',
            improvement_of_service: 'Improvement of service',
            marketing: 'Marketing',
            create_personalised_ads_profile: 'Create personalised ads profile',
            reportings: 'Reportings',
            segmentation: 'Segmentation',
            optimization: 'Optimization',
            providing_service: 'Providing Service',
            statistics: 'Statistics',
            analytics: 'Analytics',
            compliance_legal_obligations: 'Compliance with legal obligations',
            functionality: 'Functionality',
            website_security: 'Website security',
            personalisation: 'Personalisation',
            sign_up_features: 'Sign up features',
            authentication: 'Authentication',
            product_development: 'Product development',
            consent_storage: 'Consent storage',
            payment: 'Payment',
            transaction_tracking: 'Transaction tracking',
            tracking: 'Tracking',
            detecting_code_errors: 'Detecting code errors',
            develop_improve_products: 'Develop and improve products',
        },
        technologies: {
            cookies: 'Cookies',
            tracking_code: 'Tracking code',
            web_beacons: 'Web beacons',
            mobile_sdks: 'Mobile SDKs',
            pixel: 'Pixel',
            local_storage: 'Local storage',
        },
        dataCategories: {
            advertising_identifier: 'Advertising identifier',
            gaid: 'Android/Google Advertising ID',
            country: 'Country',
            device_information: 'Device information',
            ip_address: 'IP address',
            user_behaviour: 'User behaviour',
            language_information: 'Language information',
            purchase_information: 'Purchase information',
            device_id: 'Device ID',
            unique_id: 'Unique ID',
            user_id: 'User ID',
            last_name: 'Last name',
            first_name: 'First name',
            email_address: 'E-mail address',
            contact_information: 'Contact information',
            address: 'Address',
            bank_details: 'Bank details',
            account_information: 'Account information',
            data_identifiers: 'Data identifiers',
            usage_data: 'Usage data',
            referrer_url: 'Referrer URL',
            location_information: 'Location information',
            date_and_time_of_visit: 'Date and time of visit',
            facebook_user_id: 'Facebook user ID',
            websites_visited: 'Websites visited',
            geographic_location: 'Geographic location',
            preferences: 'Preferences',
            website_interaction: 'Website interaction',
            transaction_information: 'Transaction information',
            device_operating_system: 'Device operating system',
            browser_type: 'Browser type',
            click_path: 'Click path',
            cookie_id: 'Cookie ID',
            information_from_third_party_sources: 'Information from third party sources',
            hardware_software_type: 'Hardware/software type',
            username: 'Username',
            identifiers: 'Identifiers',
            profile_information: 'Profile information',
            profile_picture: 'Profile picture',
            configuration_of_app_settings: 'Configuration of app settings',
            user_agent: 'User agent',
            app_crashes: 'App crashes',
            opt_in_opt_out_data: 'Opt-in and opt-out data',
            user_settings: 'User settings',
            consent_id: 'Consent ID',
            time_of_consent: 'Time of consent',
            consent_type: 'Consent type',
            template_version: 'Template version',
            banner_language: 'Banner language',
            anonymised_user_data: 'Anonymised user data',
            date_of_purchase: 'Date of purchase',
            purchase_activity: 'Purchase activity',
            credit_debit_card_number: 'Credit and debit card number',
            log_in_info: 'Log-in info',
            browser_information: 'Browser information',
            time_zone: 'Time zone',
            error_data: 'Error data',
        },
        legalBases: {
            art6_1_a: 'Art. 6 para. 1 s. 1 lit. a GDPR',
            art6_1_b: 'Art. 6 para. 1 s. 1 lit. b GDPR',
            art6_1_c: 'Art. 6 para. 1 s. 1 lit. c GDPR',
            art6_1_d: 'Art. 6 para. 1 s. 1 lit. d GDPR',
            art6_1_e: 'Art. 6 para. 1 s. 1 lit. e GDPR',
            art6_1_f: 'Art. 6 para. 1 s. 1 lit. f GDPR',
        },
        retention: {
            until_not_needed: 'The data will be deleted as soon as they are no longer needed for the processing purposes.',
            up_to_2_years: 'The data will be kept for up to 2 years.',
            consent_one_year: 'The consent data (given consent and revocation of consent) are stored for one year. ' +
                'The data will then be deleted immediately.',
        },
        // Country names resolve via the platform's Intl.DisplayNames at runtime; only
        // overrides and non-ISO pseudo-codes (e.g. the EU) live here.
        countries: {
            EU: 'European Union',
            US: 'United States of America',
        },
        // Per-service descriptions live in the services config (ConsentService.description),
        // not here. This map stays available only as an optional localization override,
        // keyed by service id, and is empty by default.
        serviceDescriptions: {},
    };

    const regionCache = {};
    /**
     * Localized region name via the platform's `Intl.DisplayNames`, cached per
     * locale. Returns `undefined` when the API or code is unavailable so callers
     * can fall back. Covers all ISO-3166 codes without bundling a country list.
     */
    function regionName(code, locale) {
        var _a;
        try {
            const cache = ((_a = regionCache[locale]) !== null && _a !== void 0 ? _a : (regionCache[locale] = {}));
            if (code in cache)
                return cache[code];
            const dn = new Intl.DisplayNames([locale, 'en'], { type: 'region' });
            const name = dn.of(code.toUpperCase());
            const resolved = name && name !== code ? name : undefined;
            cache[code] = resolved;
            return resolved;
        }
        catch (_b) {
            return undefined;
        }
    }
    /** Replace `{name}` tokens in a template with values from `vars`. */
    function interpolate(template, vars) {
        if (!vars)
            return template;
        return template.replace(/\{(\w+)\}/g, (match, key) => Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match);
    }
    /**
     * Resolves localized strings for the consent modal. The active locale is layered
     * over the built-in English bundle, which is itself the final fallback — so a
     * missing key in a translation never blanks the UI, and an unknown ID degrades
     * to the ID itself rather than throwing.
     */
    class I18n {
        constructor(locale = 'en', extra) {
            var _a, _b;
            const bundles = Object.assign({ en }, (extra !== null && extra !== void 0 ? extra : {}));
            this.active = (_b = (_a = bundles[locale]) !== null && _a !== void 0 ? _a : bundles.en) !== null && _b !== void 0 ? _b : en;
            this.locale = locale;
        }
        /** UI chrome string with `{var}` interpolation. */
        ui(key, vars) {
            var _a, _b, _c, _d;
            const value = (_d = (_b = (_a = this.active.ui) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : (_c = en.ui) === null || _c === void 0 ? void 0 : _c[key]) !== null && _d !== void 0 ? _d : key;
            return interpolate(value, vars);
        }
        category(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.categories) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.categories) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : { name: id };
        }
        purpose(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.purposes) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.purposes) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : id;
        }
        technology(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.technologies) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.technologies) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : id;
        }
        dataCategory(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.dataCategories) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.dataCategories) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : id;
        }
        legalBasis(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.legalBases) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.legalBases) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : id;
        }
        retention(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.retention) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.retention) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : id;
        }
        /**
         * Country name for an ISO-3166 code. Explicit bundle entries win (so "EU" and
         * any publisher overrides resolve), then the platform's `Intl.DisplayNames`
         * covers every real region code, and the raw code is the final fallback.
         */
        country(code) {
            var _a, _b, _c, _d;
            const override = (_b = (_a = this.active.countries) === null || _a === void 0 ? void 0 : _a[code]) !== null && _b !== void 0 ? _b : (_c = en.countries) === null || _c === void 0 ? void 0 : _c[code];
            if (override)
                return override;
            return (_d = regionName(code, this.locale)) !== null && _d !== void 0 ? _d : code;
        }
        serviceDescription(id) {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this.active.serviceDescriptions) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : (_c = en.serviceDescriptions) === null || _c === void 0 ? void 0 : _c[id]) !== null && _d !== void 0 ? _d : '';
        }
    }

    /**
     * Stylesheet for the consent modal, injected into the component's Shadow DOM so
     * it never collides with the host app's CSS. `accent` themes buttons, switches
     * and active tabs.
     */
    function styles(accent) {
        return `
:host { all: initial; }
* { box-sizing: border-box; margin: 0; padding: 0; }
.scrim {
  position: fixed; inset: 0; z-index: 2147483647;
  background: rgba(0,0,0,.55);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  animation: fade .18s ease;
}
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }
.card {
  width: 100%; max-width: 460px; max-height: 92vh;
  background: #fff; color: #141413; border-radius: 16px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 18px 50px rgba(0,0,0,.45);
}
.scroll { overflow-y: auto; -webkit-overflow-scrolling: touch; flex: 1; }
.pad { padding: 18px; }

.logo {
  width: 56px; height: 56px; border-radius: 50%; background: ${accent};
  color: #fff; font-weight: 800; font-size: 24px;
  display: flex; align-items: center; justify-content: center;
  margin: 22px auto 6px; overflow: hidden;
}
.logo img { width: 100%; height: 100%; object-fit: cover; }

.h1 { font-weight: 800; font-size: 19px; line-height: 1.3; text-align: center; padding: 8px 22px 6px; }
.title { font-weight: 800; font-size: 21px; padding: 4px 0 2px; }
.subtitle { color: #3d3d3a; font-size: 14px; padding: 2px 0 10px; }

.links { font-weight: 800; font-size: 13px; padding: 4px 0 14px; }
.links a { color: #141413; text-decoration: none; margin-right: 16px; cursor: pointer; }
.links a:hover { text-decoration: underline; }

.prow { display: flex; gap: 14px; align-items: center; padding: 11px 0; }
.pic { width: 40px; height: 40px; border-radius: 50%; background: #eef2fd; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 19px; }
.ptxt { font-size: 14px; font-weight: 700; line-height: 1.3; }
.ptxt small { display: block; font-weight: 400; color: #3d3d3a; font-size: 12.5px; margin-top: 2px; }

.body { color: #3d3d3a; font-size: 13.5px; line-height: 1.45; padding: 8px 0; }
.body a { color: #141413; font-weight: 700; cursor: pointer; }

.btns { display: flex; flex-direction: column; gap: 11px; padding: 14px 18px 18px;
  border-top: 1px solid #eceae2; background: #fff; }
.btn { text-align: center; font-weight: 800; font-size: 15px; padding: 14px 0; border-radius: 28px;
  border: none; cursor: pointer; font-family: inherit; }
.btn.solid { background: ${accent}; color: #fff; }
.btn.solid:active { filter: brightness(.92); }

.tabs { display: flex; border-bottom: 1.5px solid #d1cfc5; }
.tab { flex: 1; text-align: center; padding: 14px 0; font-weight: 800; font-size: 15px;
  color: #87867f; background: none; border: none; cursor: pointer; font-family: inherit; }
.tab.on { color: ${accent}; box-shadow: inset 0 -3px 0 ${accent}; }

.row { border: 1.5px solid #d1cfc5; border-radius: 10px; padding: 13px 14px; margin-bottom: 11px; }
.rowhead { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; cursor: pointer; }
.name { font-weight: 800; font-size: 15px; }
.cat { color: #3d3d3a; font-size: 12px; margin-top: 2px; }
.desc { color: #3d3d3a; font-size: 12.5px; margin-top: 8px; line-height: 1.4; }

/* Categories tab: always-open sections (no card border) with plain service rows */
.section { margin: 2px 0 20px; }
.section-h { font-weight: 800; font-size: 17px; margin: 6px 0 2px; }
.section-d { color: #3d3d3a; font-size: 12.5px; margin-bottom: 4px; line-height: 1.4; }
.svcrow { padding: 12px 2px; border-bottom: 1px solid #eceae2; }
.svcrow:last-child { border-bottom: none; }
.ctrl { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

.toggle { width: 46px; height: 26px; border-radius: 13px; background: ${accent}; position: relative;
  border: none; cursor: pointer; flex-shrink: 0; transition: background .15s; padding: 0; }
.toggle.off { background: #c9c7bf; }
.toggle.locked { opacity: .6; cursor: default; }
.toggle::after { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; top: 3px; right: 3px; box-shadow: 0 2px 4px rgba(0,0,0,.35); transition: all .15s; }
.toggle.off::after { right: auto; left: 3px; }

.chev { color: #87867f; font-size: 15px; line-height: 1; background: none; border: none; cursor: pointer; }

.detail { border-top: 1px solid #d1cfc5; margin-top: 11px; padding-top: 4px; }
.detail.hidden { display: none; }
.seclabel { font-size: 11px; color: #87867f; margin: 11px 0 4px; font-weight: 600; }
.secval { font-size: 13px; line-height: 1.4; }
.secval a { color: ${accent}; word-break: break-all; }
.chip { display: inline-block; border: 1px solid #d1cfc5; border-radius: 7px; padding: 5px 9px;
  font-size: 11.5px; color: #3d3d3a; margin: 3px 4px 3px 0; }

.view.hidden { display: none; }
`;
    }

    /** Tiny hyperscript helper. `on*` props bind listeners; everything else is an attribute. */
    function h(tag, attrs = {}, children = []) {
        const node = document.createElement(tag);
        for (const [key, value] of Object.entries(attrs)) {
            if (key.startsWith('on') && typeof value === 'function') {
                node.addEventListener(key.slice(2).toLowerCase(), value);
            }
            else if (value === true) {
                node.setAttribute(key, '');
            }
            else if (value !== false) {
                node.setAttribute(key, String(value));
            }
        }
        for (const child of children)
            node.append(child);
        return node;
    }
    /**
     * The two-layer consent modal, rendered into an isolated Shadow DOM overlay
     * inside the host WebView. Resolves with the user's decision; never rejects.
     */
    class ConsentModal {
        constructor(config, i18n, opts, resolve) {
            this.config = config;
            this.i18n = i18n;
            this.opts = opts;
            this.resolve = resolve;
            this.serviceOn = {};
            this.expanded = {};
            this.tab = 'categories';
            this.prevOverflow = '';
            this.view = opts.startInManage ? 'manage' : 'first';
            this.sortedCategories = [...config.categories].sort((a, b) => { var _a, _b; return ((_a = a.order) !== null && _a !== void 0 ? _a : 0) - ((_b = b.order) !== null && _b !== void 0 ? _b : 0); });
            this.servicesByCategory = new Map();
            for (const cat of this.sortedCategories)
                this.servicesByCategory.set(cat.id, []);
            for (const svc of config.services) {
                const bucket = this.servicesByCategory.get(svc.categoryId);
                if (bucket)
                    bucket.push(svc);
                this.serviceOn[svc.id] = this.initialState(svc);
            }
            this.host = document.createElement('div');
            this.shadow = this.host.attachShadow({ mode: 'open' });
        }
        /**
         * Initial toggle: locked categories force-on; otherwise a prior saved decision
         * (if any) wins, falling back to the service/category default on first run.
         */
        initialState(svc) {
            var _a, _b;
            const cat = this.config.categories.find((c) => c.id === svc.categoryId);
            if (cat === null || cat === void 0 ? void 0 : cat.locked)
                return true;
            if (this.opts.priorConsentedIds)
                return this.opts.priorConsentedIds.includes(svc.id);
            return (_b = (_a = svc.default) !== null && _a !== void 0 ? _a : cat === null || cat === void 0 ? void 0 : cat.default) !== null && _b !== void 0 ? _b : false;
        }
        isLocked(categoryId) {
            var _a, _b;
            return (_b = (_a = this.config.categories.find((c) => c.id === categoryId)) === null || _a === void 0 ? void 0 : _a.locked) !== null && _b !== void 0 ? _b : false;
        }
        categoryOn(categoryId) {
            var _a;
            const list = (_a = this.servicesByCategory.get(categoryId)) !== null && _a !== void 0 ? _a : [];
            if (list.length === 0)
                return this.isLocked(categoryId);
            return list.every((s) => this.serviceOn[s.id]);
        }
        mount() {
            this.shadow.append(h('style', {}, [styles(this.opts.accentColor)]));
            this.prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            document.body.append(this.host);
            // Build the scrim once and keep it mounted — only the card inside is
            // swapped on re-render, so the fade-in animation never replays (no flash).
            this.scrim = h('div', { class: 'scrim' }, [this.buildCard()]);
            this.shadow.append(this.scrim);
        }
        close() {
            document.body.style.overflow = this.prevOverflow;
            this.host.remove();
            this.resolve(this.buildDecision());
        }
        buildDecision() {
            const categories = {};
            for (const cat of this.config.categories)
                categories[cat.id] = this.categoryOn(cat.id);
            return {
                granted: categories.marketing === true,
                categories,
                services: Object.assign({}, this.serviceOn),
            };
        }
        acceptAll() {
            for (const id of Object.keys(this.serviceOn))
                this.serviceOn[id] = true;
            this.close();
        }
        // --- rendering -----------------------------------------------------------
        buildCard() {
            return this.view === 'first' ? this.renderFirst() : this.renderManage();
        }
        /** Swap only the card inside the persistent scrim, preserving scroll position. */
        render() {
            var _a, _b;
            if (!this.scrim)
                return;
            const old = this.scrim.querySelector('.card');
            const prevScroll = (_b = (_a = old === null || old === void 0 ? void 0 : old.querySelector('.scroll')) === null || _a === void 0 ? void 0 : _a.scrollTop) !== null && _b !== void 0 ? _b : 0;
            const card = this.buildCard();
            if (old)
                this.scrim.replaceChild(card, old);
            else
                this.scrim.append(card);
            const scroll = card.querySelector('.scroll');
            if (scroll)
                scroll.scrollTop = prevScroll;
        }
        openManage(tab) {
            this.view = 'manage';
            this.tab = tab;
            this.render();
        }
        renderFirst() {
            var _a;
            const t = this.i18n;
            const logo = this.opts.logoUrl
                ? h('div', { class: 'logo' }, [h('img', { src: this.opts.logoUrl, alt: '' })])
                : h('div', { class: 'logo' }, [((_a = this.opts.appName[0]) !== null && _a !== void 0 ? _a : '?').toUpperCase()]);
            const rows = this.sortedCategories.map((cat) => {
                var _a, _b;
                const meta = t.category(cat.id);
                return h('div', { class: 'prow' }, [
                    h('div', { class: 'pic' }, [(_a = cat.icon) !== null && _a !== void 0 ? _a : '•']),
                    h('div', { class: 'ptxt' }, [meta.name, h('small', {}, [(_b = meta.description) !== null && _b !== void 0 ? _b : ''])]),
                ]);
            });
            const body = h('div', { class: 'body' }, [
                t.ui('firstLayer.body', { appName: this.opts.appName, count: this.config.services.length }) + ' ',
                h('a', { onclick: () => this.openManage('services') }, [t.ui('firstLayer.partners')]),
            ]);
            const legInt = h('div', { class: 'body' }, [t.ui('firstLayer.legInt')]);
            return h('div', { class: 'card' }, [
                h('div', { class: 'scroll' }, [
                    logo,
                    h('div', { class: 'h1' }, [t.ui('firstLayer.title', { appName: this.opts.appName })]),
                    h('div', { class: 'pad' }, [...rows, body, legInt, this.linksRow()]),
                ]),
                h('div', { class: 'btns' }, [
                    h('button', { class: 'btn solid', onclick: () => this.acceptAll() }, [t.ui('btn.consent')]),
                    h('button', { class: 'btn solid', onclick: () => this.openManage('categories') }, [t.ui('btn.manage')]),
                ]),
            ]);
        }
        linksRow() {
            const t = this.i18n;
            const links = [];
            if (this.opts.privacyPolicyUrl) {
                links.push(h('a', { href: this.opts.privacyPolicyUrl, target: '_blank', rel: 'noopener' }, [t.ui('link.privacyPolicy')]));
            }
            if (this.opts.legalNoticeUrl) {
                links.push(h('a', { href: this.opts.legalNoticeUrl, target: '_blank', rel: 'noopener' }, [t.ui('link.legalNotice')]));
            }
            return h('div', { class: 'links' }, links);
        }
        renderManage() {
            const t = this.i18n;
            const content = this.tab === 'categories' ? this.renderCategories() : this.renderServices();
            return h('div', { class: 'card' }, [
                h('div', { class: 'pad', style: 'padding-bottom:0' }, [
                    h('div', { class: 'title' }, [t.ui('manage.title')]),
                    h('div', { class: 'subtitle' }, [t.ui('manage.subtitle')]),
                ]),
                h('div', { class: 'tabs' }, [
                    h('button', { class: `tab ${this.tab === 'categories' ? 'on' : ''}`, onclick: () => this.setTab('categories') }, [t.ui('tab.categories')]),
                    h('button', { class: `tab ${this.tab === 'services' ? 'on' : ''}`, onclick: () => this.setTab('services') }, [t.ui('tab.services')]),
                ]),
                h('div', { class: 'scroll' }, [h('div', { class: 'pad' }, [...content, this.linksRow()])]),
                h('div', { class: 'btns' }, [
                    h('button', { class: 'btn solid', onclick: () => this.acceptAll() }, [t.ui('btn.acceptAll')]),
                    h('button', { class: 'btn solid', onclick: () => this.close() }, [t.ui('btn.confirm')]),
                ]),
            ]);
        }
        setTab(tab) {
            this.tab = tab;
            this.render();
        }
        toggleEl(on, locked, onToggle) {
            // Always capture the click (even when locked) so it never bubbles to the
            // header's expand handler — locked toggles are a no-op, not an expand.
            return h('button', {
                class: `toggle ${on ? '' : 'off'} ${locked ? 'locked' : ''}`,
                onclick: (e) => {
                    e.stopPropagation();
                    if (!locked)
                        onToggle();
                },
            });
        }
        /** Categories are always-open sections (no border, no master toggle): a header
         *  plus the per-service rows beneath it. */
        renderCategories() {
            const t = this.i18n;
            return this.sortedCategories.map((cat) => {
                var _a, _b;
                const meta = t.category(cat.id);
                const svcRows = ((_a = this.servicesByCategory.get(cat.id)) !== null && _a !== void 0 ? _a : []).map((svc) => this.serviceRow(svc, true));
                return h('div', { class: 'section' }, [
                    h('div', { class: 'section-h' }, [meta.name]),
                    h('div', { class: 'section-d' }, [(_b = meta.description) !== null && _b !== void 0 ? _b : '']),
                    ...svcRows,
                ]);
            });
        }
        renderServices() {
            return this.config.services.map((svc) => this.serviceRow(svc, false));
        }
        /** A service row. `nested` ones (inside a category) hide their own category label. */
        serviceRow(svc, nested) {
            const t = this.i18n;
            const locked = this.isLocked(svc.categoryId);
            const on = this.serviceOn[svc.id];
            const key = `svc:${svc.id}`;
            const open = this.expanded[key];
            const titleBlock = [h('div', { class: 'name' }, [brandName(svc.id)])];
            if (!nested)
                titleBlock.push(h('div', { class: 'cat' }, [t.category(svc.categoryId).name]));
            const head = h('div', { class: 'rowhead', onclick: () => this.toggleExpand(key) }, [
                h('div', {}, titleBlock),
                h('div', { class: 'ctrl' }, [
                    this.toggleEl(on, locked, () => this.setService(svc.id, !on)),
                    h('span', { class: 'chev' }, [open ? '▲' : '▼']),
                ]),
            ]);
            const children = [head];
            if (open)
                children.push(this.serviceDetail(svc));
            // Nested (under a category section) = plain divided row; standalone (Services
            // tab) = bordered card.
            return h('div', { class: nested ? 'svcrow' : 'row' }, children);
        }
        serviceDetail(svc) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const t = this.i18n;
            const parts = [];
            // Localized override wins; otherwise the service's own description.
            const desc = t.serviceDescription(svc.id) || svc.description || '';
            if (desc) {
                parts.push(h('div', { class: 'seclabel' }, [t.ui('section.description')]));
                parts.push(h('div', { class: 'secval' }, [desc]));
            }
            parts.push(h('div', { class: 'seclabel' }, [t.ui('section.company')]));
            parts.push(h('div', { class: 'secval' }, [
                svc.company.name + (svc.company.address ? ` — ${svc.company.address}` : ''),
            ]));
            this.chipSection(parts, 'section.purposes', ((_a = svc.purposeIds) !== null && _a !== void 0 ? _a : []).map((id) => t.purpose(id)));
            this.chipSection(parts, 'section.technologies', ((_b = svc.technologyIds) !== null && _b !== void 0 ? _b : []).map((id) => t.technology(id)));
            this.chipSection(parts, 'section.dataCollected', ((_c = svc.dataCollectedIds) !== null && _c !== void 0 ? _c : []).map((id) => t.dataCategory(id)));
            this.chipSection(parts, 'section.legalBasis', ((_d = svc.legalBasisIds) !== null && _d !== void 0 ? _d : []).map((id) => t.legalBasis(id)));
            if ((_e = svc.locationCC) === null || _e === void 0 ? void 0 : _e.length) {
                parts.push(h('div', { class: 'seclabel' }, [t.ui('section.location')]));
                parts.push(h('div', { class: 'secval' }, [svc.locationCC.map((c) => t.country(c)).join(', ')]));
            }
            if (svc.retentionId) {
                parts.push(h('div', { class: 'seclabel' }, [t.ui('section.retention')]));
                parts.push(h('div', { class: 'secval' }, [t.retention(svc.retentionId)]));
            }
            if ((_f = svc.transferCC) === null || _f === void 0 ? void 0 : _f.length) {
                this.chipSection(parts, 'section.transfer', svc.transferCC.map((c) => t.country(c)));
            }
            if ((_g = svc.recipients) === null || _g === void 0 ? void 0 : _g.length) {
                this.chipSection(parts, 'section.recipients', svc.recipients);
            }
            const urlLink = (label, url) => {
                if (!url)
                    return;
                parts.push(h('div', { class: 'secval', style: 'margin-top:10px' }, [
                    h('a', { href: url, target: '_blank', rel: 'noopener' }, [label]),
                ]));
            };
            urlLink(t.ui('link.privacyPolicyOf'), (_h = svc.urls) === null || _h === void 0 ? void 0 : _h.privacy);
            urlLink(t.ui('link.cookiePolicyOf'), (_j = svc.urls) === null || _j === void 0 ? void 0 : _j.cookie);
            urlLink(t.ui('link.optOutOf'), (_k = svc.urls) === null || _k === void 0 ? void 0 : _k.optOut);
            return h('div', { class: 'detail' }, parts);
        }
        chipSection(parts, labelKey, values) {
            if (!values.length)
                return;
            parts.push(h('div', { class: 'seclabel' }, [this.i18n.ui(labelKey)]));
            parts.push(h('div', {}, values.map((v) => h('span', { class: 'chip' }, [v]))));
        }
        // --- state mutations -----------------------------------------------------
        setService(id, on) {
            this.serviceOn[id] = on;
            this.render();
        }
        toggleExpand(key) {
            this.expanded[key] = !this.expanded[key];
            this.render();
        }
    }
    /**
     * Derive a human brand name from a service id when none is provided. Hyphen and
     * underscore become spaces and words are title-cased — `unity-ads` → `Unity Ads`.
     * Publishers can always override the display by id in their data, but the
     * reference services map cleanly.
     */
    const BRAND_OVERRIDES = {
        ironsource: 'ironSource',
        'pangle-sdk': 'Pangle SDK',
        'facebook-audience-network': 'Facebook Audience Network',
        'google-firebase-analytics': 'Google Firebase Analytics',
        'usercentrics-cmp': 'Usercentrics Consent Management Platform',
        revenuecat: 'RevenueCat',
    };
    function brandName(id) {
        if (BRAND_OVERRIDES[id])
            return BRAND_OVERRIDES[id];
        return id
            .split(/[-_]/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }
    function presentConsentModal(config, i18n, opts) {
        return new Promise((resolve) => {
            new ConsentModal(config, i18n, opts, resolve).mount();
        });
    }

    /**
     * Self-contained IAB TCF v2 encoder. Produces the websafe-base64 **core** TC
     * string segment and the matching in-app `IABTCF_*` key map that mediation
     * adapters read from the platform key store.
     *
     * This is "TCF-compatible" output: the bit layout follows the spec so adapters
     * decode it correctly, but the plugin is not an IAB-registered CMP — `cmpId`
     * defaults to 0 (non-certified). No external dependency: a hand-rolled
     * `BitWriter` avoids pulling `@iabtcf/core` (and three Rollup plugins) into the
     * distributed bundle.
     */
    const BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    /** TCF policy version 5 corresponds to TCF v2.3. */
    const DEFAULT_POLICY_VERSION = 5;
    const TC_VERSION = 2;
    const NUM_PURPOSES = 24;
    const NUM_SPECIAL_FEATURES = 12;
    /** Appends fixed-width unsigned integers, bitfields and 6-bit chars. */
    class BitWriter {
        constructor() {
            this.bits = '';
        }
        /** Big-endian, `length` bits. Safe for values up to 2^53 (e.g. 36-bit time). */
        int(value, length) {
            let v = Math.floor(value);
            let out = '';
            for (let i = 0; i < length; i++) {
                out = (v % 2) + out;
                v = Math.floor(v / 2);
            }
            this.bits += out;
        }
        bool(value) {
            this.bits += value ? '1' : '0';
        }
        /** A `length`-bit field where bit (i-1) is set when `set` contains `i`. */
        bitfield(set, length) {
            for (let i = 1; i <= length; i++)
                this.bits += set.has(i) ? '1' : '0';
        }
        /** Two 6-bit chars (A=0..Z=25) from a 2-letter code. */
        code(value) {
            const upper = (value || 'AA').toUpperCase().padEnd(2, 'A');
            this.int(upper.charCodeAt(0) - 65, 6);
            this.int(upper.charCodeAt(1) - 65, 6);
        }
        /** Right-pad to a multiple of 6 and map each group to websafe base64. */
        encode() {
            const padded = this.bits.padEnd(Math.ceil(this.bits.length / 6) * 6, '0');
            let out = '';
            for (let i = 0; i < padded.length; i += 6) {
                out += BASE64URL[parseInt(padded.slice(i, i + 6), 2)];
            }
            return out;
        }
    }
    /** Collapse the enabled services' TCF declarations into the bitfield sets. */
    function deriveSets(config, decision) {
        var _a, _b, _c;
        const sets = {
            purposeConsents: new Set(),
            purposeLI: new Set(),
            specialFeatures: new Set(),
            vendorConsents: new Set(),
            vendorLI: new Set(),
            maxVendorId: 0,
            googleAtpIds: [],
        };
        for (const service of config.services) {
            const tcf = service.tcf;
            if (!(tcf === null || tcf === void 0 ? void 0 : tcf.vendorId))
                continue;
            // maxVendorId spans every declared vendor, granted or not (spec: highest ID).
            sets.maxVendorId = Math.max(sets.maxVendorId, tcf.vendorId);
            if (!decision.services[service.id])
                continue;
            sets.vendorConsents.add(tcf.vendorId);
            ((_a = tcf.purposeConsents) !== null && _a !== void 0 ? _a : []).forEach((p) => sets.purposeConsents.add(p));
            ((_b = tcf.specialFeatures) !== null && _b !== void 0 ? _b : []).forEach((f) => sets.specialFeatures.add(f));
            if ((_c = tcf.purposeLegInt) === null || _c === void 0 ? void 0 : _c.length) {
                tcf.purposeLegInt.forEach((p) => sets.purposeLI.add(p));
                sets.vendorLI.add(tcf.vendorId);
            }
            if (tcf.googleAtpId)
                sets.googleAtpIds.push(tcf.googleAtpId);
        }
        return sets;
    }
    /** A `length`-char `'0'`/`'1'` string for the in-app key format. */
    function binaryString(set, length) {
        let out = '';
        for (let i = 1; i <= length; i++)
            out += set.has(i) ? '1' : '0';
        return out;
    }
    /**
     * Encode the decision into a TC string + the `IABTCF_*` key map.
     */
    function buildTcf(config, decision, opts) {
        const sets = deriveSets(config, decision);
        const created = Math.floor(opts.now / 100); // deciseconds since epoch
        const w = new BitWriter();
        w.int(TC_VERSION, 6);
        w.int(created, 36);
        w.int(created, 36);
        w.int(opts.cmpId, 12);
        w.int(opts.cmpVersion, 12);
        w.int(0, 6); // consent screen
        w.code(opts.language);
        w.int(opts.vendorListVersion, 12);
        w.int(opts.policyVersion, 6);
        w.bool(true); // isServiceSpecific
        w.bool(false); // useNonStandardTexts
        w.bitfield(sets.specialFeatures, NUM_SPECIAL_FEATURES);
        w.bitfield(sets.purposeConsents, NUM_PURPOSES);
        w.bitfield(sets.purposeLI, NUM_PURPOSES);
        w.bool(false); // purposeOneTreatment
        w.code(opts.publisherCC);
        // Vendor consents — bitfield encoding (isRangeEncoding = 0).
        w.int(sets.maxVendorId, 16);
        w.bool(false);
        w.bitfield(sets.vendorConsents, sets.maxVendorId);
        // Vendor legitimate interests — bitfield encoding.
        w.int(sets.maxVendorId, 16);
        w.bool(false);
        w.bitfield(sets.vendorLI, sets.maxVendorId);
        w.int(0, 12); // numPubRestrictions
        const tcString = w.encode();
        const keys = {
            IABTCF_CmpSdkID: opts.cmpId,
            IABTCF_CmpSdkVersion: opts.cmpVersion,
            IABTCF_PolicyVersion: opts.policyVersion,
            IABTCF_gdprApplies: 1,
            IABTCF_PublisherCC: (opts.publisherCC || 'AA').toUpperCase(),
            IABTCF_PurposeOneTreatment: 0,
            IABTCF_UseNonStandardTexts: 0,
            IABTCF_TCString: tcString,
            IABTCF_VendorConsents: binaryString(sets.vendorConsents, sets.maxVendorId),
            IABTCF_VendorLegitimateInterests: binaryString(sets.vendorLI, sets.maxVendorId),
            IABTCF_PurposeConsents: binaryString(sets.purposeConsents, NUM_PURPOSES),
            IABTCF_PurposeLegitimateInterests: binaryString(sets.purposeLI, NUM_PURPOSES),
            IABTCF_SpecialFeaturesOptIns: binaryString(sets.specialFeatures, NUM_SPECIAL_FEATURES),
            // Google Additional Consent (AC) string, version 2, for AdMob / ATP demand.
            IABTCF_AddtlConsent: sets.googleAtpIds.length ? `2~${sets.googleAtpIds.join('.')}` : '2~',
        };
        return { tcString, keys };
    }

    const DEFAULT_ACCENT = '#143cc4';
    function parseServices(input) {
        if (!input)
            return null;
        if (typeof input === 'string') {
            try {
                return JSON.parse(input);
            }
            catch (_a) {
                return null;
            }
        }
        return input;
    }
    /**
     * Resolve the GVL version recorded in the TC string. Reads it from a supplied
     * GVL object, or fetches a *publisher-hosted* URL (never consensu.org — IAB
     * disallows client-side fetch of the canonical list), falling back to the
     * version declared in the services config.
     */
    async function resolveGvlVersion(gvl, config) {
        var _a, _b, _c;
        const fallback = (_a = config.gvlVendorListVersion) !== null && _a !== void 0 ? _a : 0;
        if (gvl && typeof gvl === 'object') {
            return (_b = gvl.vendorListVersion) !== null && _b !== void 0 ? _b : fallback;
        }
        if (typeof gvl === 'string') {
            try {
                const res = await fetch(gvl);
                const json = (await res.json());
                return (_c = json.vendorListVersion) !== null && _c !== void 0 ? _c : fallback;
            }
            catch (_d) {
                return fallback;
            }
        }
        return fallback;
    }
    /**
     * Drives the rich custom consent modal end to end: render the DOM overlay,
     * encode the decision into TCF v2.3-compatible keys, hand them to the native
     * layer to persist + forward to LevelPlay, and return the resulting
     * {@link ConsentData}.
     *
     * When no `services` config is supplied, falls back to the native provider
     * (legacy alert / Usercentrics / InMobi) so existing integrations are
     * unaffected.
     *
     * @param force `true` for `showPrivacyOptions` — always shows the modal,
     *   opening on the Manage screen. `false` for `requestConsentInfo` — reuses a
     *   stored decision when one exists.
     */
    async function runConsentFlow(plugin, options, force) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const config = parseServices(options === null || options === void 0 ? void 0 : options.services);
        if (!config) {
            return force ? plugin.showPrivacyOptions(options) : plugin.requestConsentInfo(options);
        }
        const existing = await plugin.getConsentData().catch(() => undefined);
        if (!force && (existing === null || existing === void 0 ? void 0 : existing.canRequestAds))
            return existing;
        const i18n = new I18n((_a = options === null || options === void 0 ? void 0 : options.locale) !== null && _a !== void 0 ? _a : 'en', options === null || options === void 0 ? void 0 : options.translations);
        const decision = await presentConsentModal(config, i18n, {
            appName: (_b = options === null || options === void 0 ? void 0 : options.appName) !== null && _b !== void 0 ? _b : 'This app',
            logoUrl: options === null || options === void 0 ? void 0 : options.logoUrl,
            accentColor: (_c = options === null || options === void 0 ? void 0 : options.accentColor) !== null && _c !== void 0 ? _c : DEFAULT_ACCENT,
            privacyPolicyUrl: options === null || options === void 0 ? void 0 : options.privacyPolicyUrl,
            legalNoticeUrl: options === null || options === void 0 ? void 0 : options.legalNoticeUrl,
            startInManage: force,
            // Seed from the saved decision so re-opening reflects prior choices.
            priorConsentedIds: (existing === null || existing === void 0 ? void 0 : existing.canRequestAds) ? existing.consentedServiceIds : undefined,
        });
        const vendorListVersion = await resolveGvlVersion(options === null || options === void 0 ? void 0 : options.gvl, config);
        const { tcString, keys } = buildTcf(config, decision, {
            cmpId: (_d = options === null || options === void 0 ? void 0 : options.cmpId) !== null && _d !== void 0 ? _d : 0,
            cmpVersion: (_e = options === null || options === void 0 ? void 0 : options.cmpVersion) !== null && _e !== void 0 ? _e : 1,
            vendorListVersion,
            policyVersion: (_f = config.tcfPolicyVersion) !== null && _f !== void 0 ? _f : DEFAULT_POLICY_VERSION,
            language: ((_g = options === null || options === void 0 ? void 0 : options.locale) !== null && _g !== void 0 ? _g : 'en').slice(0, 2),
            publisherCC: (_h = config.publisherCC) !== null && _h !== void 0 ? _h : 'AA',
            now: Date.now(),
        });
        const consentedServiceIds = Object.keys(decision.services).filter((id) => decision.services[id]);
        // Map each service's toggle to its LevelPlay network key so the mediated SDK
        // gets the matching per-network GDPR consent.
        const networkConsents = {};
        for (const svc of config.services) {
            if (svc.network)
                networkConsents[svc.network] = decision.services[svc.id] === true;
        }
        const data = await plugin.persistConsent({
            keys,
            granted: decision.granted,
            networkConsents,
            consentedServiceIds,
        });
        return Object.assign(Object.assign({}, data), { tcString: (_j = data.tcString) !== null && _j !== void 0 ? _j : tcString, consentedServiceIds });
    }

    /**
     * Typed event-name constants. Prefer `AdEvent.InterstitialLoaded` over the
     * string literal — typos surface at compile time.
     */
    const AdEvent = {
        InterstitialLoaded: 'onInterstitialAdLoaded',
        InterstitialLoadFailed: 'onInterstitialAdLoadFailed',
        InterstitialDisplayed: 'onInterstitialAdDisplayed',
        InterstitialDisplayFailed: 'onInterstitialAdDisplayFailed',
        InterstitialClicked: 'onInterstitialAdClicked',
        InterstitialClosed: 'onInterstitialAdClosed',
        InterstitialInfoChanged: 'onInterstitialAdInfoChanged',
        RewardedLoaded: 'onRewardedAdLoaded',
        RewardedLoadFailed: 'onRewardedAdLoadFailed',
        RewardedDisplayed: 'onRewardedAdDisplayed',
        RewardedDisplayFailed: 'onRewardedAdDisplayFailed',
        RewardedClicked: 'onRewardedAdClicked',
        RewardedClosed: 'onRewardedAdClosed',
        RewardedInfoChanged: 'onRewardedAdInfoChanged',
        RewardedRewarded: 'onRewardedAdRewarded',
        BannerLoaded: 'onBannerAdLoaded',
        BannerLoadFailed: 'onBannerAdLoadFailed',
        BannerDisplayed: 'onBannerAdDisplayed',
        BannerDisplayFailed: 'onBannerAdDisplayFailed',
        BannerClicked: 'onBannerAdClicked',
        BannerExpanded: 'onBannerAdExpanded',
        BannerCollapsed: 'onBannerAdCollapsed',
        BannerLeftApplication: 'onBannerAdLeftApplication',
        AdRevenue: 'onAdRevenue',
        ConsentStatusChanged: 'onConsentStatusChanged',
        OrientationChanged: 'onOrientationChanged',
    };

    const native = core.registerPlugin('LevelPlayAds', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.LevelPlayAdsWeb()),
    });
    /**
     * Canonicalize loose position aliases — `top-left`, `topLeft`, `top_left`
     * all map to `TOP_LEFT`. Unknown values pass through untouched so the
     * native layer can fall back to its default.
     */
    function normalizePosition(value) {
        if (value == null)
            return undefined;
        return value.replace(/[-\s]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    }
    /**
     * Canonicalize loose size aliases — `mrec` / `mediumRectangle` / `medium-rectangle`
     * all map to `MEDIUM_RECTANGLE`. Unknown values pass through untouched.
     */
    function normalizeSize(value) {
        if (value == null)
            return undefined;
        const upper = value.replace(/[-\s]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
        if (upper === 'MREC')
            return 'MEDIUM_RECTANGLE';
        return upper;
    }
    const LevelPlayAds = new Proxy(native, {
        get(target, prop, receiver) {
            if (prop === 'createBanner') {
                return (options) => {
                    var _a, _b;
                    return target.createBanner(Object.assign(Object.assign({}, options), { position: (_a = normalizePosition(options.position)) !== null && _a !== void 0 ? _a : options.position, adSize: (_b = normalizeSize(options.adSize)) !== null && _b !== void 0 ? _b : options.adSize }));
                };
            }
            if (prop === 'updateBannerStyle') {
                return (options) => {
                    var _a;
                    return target.updateBannerStyle(Object.assign(Object.assign({}, options), { position: (_a = normalizePosition(options.position)) !== null && _a !== void 0 ? _a : options.position }));
                };
            }
            // When a `services` config is supplied, render the rich DOM consent modal
            // in the web layer (identical on iOS/Android) and persist via native;
            // otherwise these fall through to the native provider unchanged.
            if (prop === 'requestConsentInfo') {
                return (options) => runConsentFlow(target, options, false);
            }
            if (prop === 'showPrivacyOptions') {
                return (options) => runConsentFlow(target, options, true);
            }
            return Reflect.get(target, prop, receiver);
        },
    });

    const WEB_CONSENT_KEY = 'levelplay_consent_web';
    /**
     * Web fallback. LevelPlay has no web SDK, so ad methods are no-ops and consent
     * resolves as granted so web builds do not block on the consent gate.
     */
    class LevelPlayAdsWeb extends core.WebPlugin {
        constructor() {
            super(...arguments);
            this.grantedConsent = {
                status: 'GRANTED',
                granted: true,
                canRequestAds: true,
                provider: 'custom',
            };
        }
        // ==========================================
        // INITIALIZATION
        // ==========================================
        async initialize(_options) {
            return { status: 'INITIALIZATION_BYPASSED_ON_WEB' };
        }
        async launchTestSuite() {
            // No-op for web
        }
        async setDynamicUserId(_options) {
            // No-op for web
        }
        // ==========================================
        // CONSENT & PRIVACY
        // ==========================================
        async requestConsentInfo(_options) {
            return this.grantedConsent;
        }
        async showPrivacyOptions(_options) {
            return this.grantedConsent;
        }
        async getConsentData() {
            var _a;
            return (_a = this.storedConsent()) !== null && _a !== void 0 ? _a : this.grantedConsent;
        }
        async resetConsent() {
            try {
                localStorage.removeItem(WEB_CONSENT_KEY);
            }
            catch (_a) {
                // localStorage unavailable (e.g. private mode) — nothing to clear.
            }
            return this.grantedConsent;
        }
        /**
         * Persists a decision computed by the rich consent modal. On web there is no
         * IAB key store or LevelPlay SDK, so the `IABTCF_*` keys and granted flag are
         * stashed in localStorage purely so the overlay can be exercised in a browser.
         */
        async persistConsent(options) {
            const data = {
                status: options.granted ? 'GRANTED' : 'DENIED',
                granted: options.granted,
                canRequestAds: true,
                provider: 'custom',
                tcString: typeof options.keys.IABTCF_TCString === 'string' ? options.keys.IABTCF_TCString : undefined,
                consentedServiceIds: options.consentedServiceIds,
            };
            try {
                localStorage.setItem(WEB_CONSENT_KEY, JSON.stringify(data));
            }
            catch (_a) {
                // Ignore — persistence is best-effort on web.
            }
            return data;
        }
        storedConsent() {
            try {
                const raw = localStorage.getItem(WEB_CONSENT_KEY);
                return raw ? JSON.parse(raw) : null;
            }
            catch (_a) {
                return null;
            }
        }
        async setCCPAConsent(_options) {
            // No-op for web
        }
        async setChildDirected(_options) {
            // No-op for web
        }
        async requestTrackingAuthorization() {
            return { status: 'NOT_APPLICABLE' };
        }
        async getAdvertisingId() {
            return { id: '', limited: true };
        }
        // ==========================================
        // BANNER
        // ==========================================
        async createBanner(_options) {
            // No-op for web
        }
        async showBanner() {
            // No-op for web
        }
        async hideBanner() {
            // No-op for web
        }
        async destroyBanner() {
            // No-op for web
        }
        async updateBannerStyle(_options) {
            // No-op for web
        }
        // ==========================================
        // INTERSTITIAL
        // ==========================================
        async loadInterstitial(_options) {
            // No-op for web
        }
        async isInterstitialReady() {
            return { isReady: false };
        }
        async showInterstitial() {
            // No-op for web
        }
        // ==========================================
        // REWARDED
        // ==========================================
        async loadRewarded(_options) {
            // No-op for web
        }
        async isRewardedReady() {
            return { isReady: false };
        }
        async showRewarded() {
            // No-op for web
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        LevelPlayAdsWeb: LevelPlayAdsWeb
    });

    exports.AdEvent = AdEvent;
    exports.LevelPlayAds = LevelPlayAds;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map

window.LevelPlayAds = capacitorLevelPlayAds.LevelPlayAds;

