export interface BotConfig {
    URL: string;
    API_KEY: string;
    MAIN_PAGE_SCRAPER_ID: string;
    MAIN_PAGE_SCRAPER_TASK_KEY: string;
    ADDITIONAL_DATA_SCRAPER_ID: string;
  }
  
export interface BotApiUrls {
    ironit: BotConfig;
    mishkanAshdod: BotConfig;
    mevalim: BotConfig;
  }
  
  export const BOT_API_URLS: BotApiUrls = {
    ironit: {
      URL: "https://api.browse.ai/v2/robots",
      API_KEY: "ce288a74-7afa-494c-9581-ac1d4f70c511:4cfc4149-5b0d-4794-803c-b23d91e177d7",
      MAIN_PAGE_SCRAPER_ID: "c495b2dc-7098-4cff-8184-5c67999502f6",
      MAIN_PAGE_SCRAPER_TASK_KEY: "3682b5e0-3c3b-45a4-979d-861a3b513d06",
      ADDITIONAL_DATA_SCRAPER_ID: "6db3c790-cb9e-43e2-807d-50c372050b15",
    },
    mishkanAshdod: {
      URL: "https://api.browse.ai/v2/robots",
      API_KEY: "ce288a74-7afa-494c-9581-ac1d4f70c511:4cfc4149-5b0d-4794-803c-b23d91e177d7",
      MAIN_PAGE_SCRAPER_ID: "2e161947-200c-408a-8fe2-7ecadcaa5a4e",
      MAIN_PAGE_SCRAPER_TASK_KEY: "87175429-69a1-45e9-a253-c7c4468ecbf6",
      ADDITIONAL_DATA_SCRAPER_ID: "de2bcb2a-248a-42c8-939d-5633a336ee92",
    },
    mevalim: {
      URL: "https://api.browse.ai/v2/robots",
      API_KEY: "ce288a74-7afa-494c-9581-ac1d4f70c511:4cfc4149-5b0d-4794-803c-b23d91e177d7",
      MAIN_PAGE_SCRAPER_ID: "24326015-2190-4377-8d7d-f17b0af64e25",
      MAIN_PAGE_SCRAPER_TASK_KEY: "996b21a3-03b2-46fb-b69b-faf94ff26677",
      ADDITIONAL_DATA_SCRAPER_ID: "55d177ef-b87f-4172-810b-7cd2407416a3",
    },
  };
  