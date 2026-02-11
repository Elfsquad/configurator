import "jest";
import fetchMock from "jest-fetch-mock";
import { ConfiguratorContext } from "./ConfiguratorContext";
import { ConfiguratorHttpError } from "./ConfiguratorHttpError";
import { QuotationRequest } from "../models/QuotationRequest";

describe("ConfiguratorContext", () => {
  const API_URL = `http://example.com`;
  let configuratorContext: ConfiguratorContext;
  let lastRequest: Request;

  function mockNextFetchResponse(body: unknown) {
    fetchMock.mockResponseOnce(async (req: Request) => {
      lastRequest = req;
      return typeof body === "string" ? body : JSON.stringify(body);
    });
  }

  function mockNextFetchErrorResponse(status: number, body: string) {
    fetchMock.mockResponseOnce(async (req: Request) => {
      lastRequest = req;
      return { body, status, headers: { "Content-Type": "application/json" } };
    });
  }

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(async (req: Request) => {
      lastRequest = req;
      return JSON.stringify({});
    });

    configuratorContext = new ConfiguratorContext({
      apiUrl: API_URL,
      tenantId: "<TENANT_ID>",
    });
  });

  it("should create an instance", () => {
    expect(configuratorContext).toBeTruthy();
  });

  it("should add new configurations to the configurations list", async () => {
    mockNextFetchResponse({ id: "test" });

    const configuration = await configuratorContext.newConfiguration("test");

    expect(configuratorContext.configurations.length).toBe(1);
    expect(configuratorContext.configurations[0]).toEqual(configuration);
    expect(configuration["_configuratorContext"]).toBe(configuratorContext);
    expect(configuration.id).toBe("test");
  });

  it("should add opened configurations to the configurations list", async () => {
    mockNextFetchResponse({ id: "test" });

    const configuration = await configuratorContext.openConfiguration("test");

    expect(configuratorContext.configurations.length).toBe(1);
    expect(configuratorContext.configurations[0]).toEqual(configuration);
    expect(configuration["_configuratorContext"]).toBe(configuratorContext);
    expect(configuration.id).toBe("test");
  });

  it("should call correct endpoint for getConfigurationModels", async () => {
    mockNextFetchResponse({ features: [] });

    await configuratorContext.getConfigurationModels();

    expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/configurationmodels`);
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getConfigurationModels with language", async () => {
    mockNextFetchResponse({ features: [] });

    await configuratorContext.getConfigurationModels("en");

    expect(lastRequest.url).toBe(
      `${API_URL}/configurator/3/configurator/configurationmodels?lang=en`
    );
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for newConfiguration", async () => {
    mockNextFetchResponse({ id: "test", linkedConfigurationModels: [] });

    await configuratorContext.newConfiguration("test");

    expect(lastRequest.url).toContain(`${API_URL}/configurator/3/configurator/new/test`);
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for openConfiguration", async () => {
    mockNextFetchResponse({ id: "test-id", linkedConfigurationModels: [] });

    await configuratorContext.openConfiguration("test-id");

    expect(lastRequest.url).toContain(`${API_URL}/configurator/3/configurator/open/test-id`);
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getSettings", async () => {
    mockNextFetchResponse({});

    await configuratorContext.getSettings();

    expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/settings`);
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getLayout2d", async () => {
    mockNextFetchResponse({
      id: "cfg-id",
      linkedConfigurationModels: [],
      steps: [{ id: "step-1" }],
    });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse([]);
    await configuratorContext.getLayout2d("cfg-id", "step-1");

    expect(lastRequest.url).toBe(
      `${API_URL}/configurator/3/configurator/cfg-id/2dlayout?stepId=step-1`
    );
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getLayout3d", async () => {
    mockNextFetchResponse({ id: "cfg-id", linkedConfigurationModels: [] });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse([]);
    await configuratorContext.getLayout3d("cfg-id");

    expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/cfg-id/3dlayout`);
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getLinkedConfigurationOverview", async () => {
    mockNextFetchResponse({ id: "cfg-id", linkedConfigurationModels: [] });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse({});
    await configuratorContext.getLinkedConfigurationOverview();

    expect(lastRequest.url).toBe(
      `${API_URL}/configurator/3/configurator/cfg-id/linkedconfigurations/overview`
    );
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for getOverview", async () => {
    mockNextFetchResponse({ id: "cfg-id", linkedConfigurationModels: [] });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse([]);
    await configuratorContext.getOverview();

    expect(lastRequest.url).toBe(
      `${API_URL}/configurator/3/configurator/overview/multiple?configurationIds=cfg-id`
    );
    expect(lastRequest.method).toBe("GET");
  });

  it("should call correct endpoint for requestQuote", async () => {
    mockNextFetchResponse({ id: "cfg-id", linkedConfigurationModels: [] });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse({});
    await configuratorContext.requestQuote({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    } as QuotationRequest);

    expect(lastRequest.url).toBe(`${API_URL}/api/2/configurations/cfg-id/requestQuote`);
    expect(lastRequest.method).toBe("POST");
  });

  it("should call correct endpoint for addToQuotation", async () => {
    mockNextFetchResponse({ id: "cfg-id", linkedConfigurationModels: [] });
    await configuratorContext.newConfiguration("test");

    mockNextFetchResponse({});
    await configuratorContext.addToQuotation("quotation-id");

    expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/addtoquotation`);
    expect(lastRequest.method).toBe("PUT");
  });

  describe("anonymous auth with tenantDomain only", () => {
    it("should not log an error when created with only tenantDomain", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const ctx = new ConfiguratorContext({
        apiUrl: API_URL,
        tenantDomain: "test.example.com",
      });

      expect(ctx).toBeTruthy();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it("should include x-elfsquad-domain but not x-elfsquad-id in requests", async () => {
      const ctx = new ConfiguratorContext({
        apiUrl: API_URL,
        tenantDomain: "test.example.com",
      });

      mockNextFetchResponse({});
      await ctx.getSettings();

      expect(lastRequest.headers.get("x-elfsquad-domain")).toBe("test.example.com");
      expect(lastRequest.headers.get("x-elfsquad-id")).toBeNull();
    });
  });

  describe("HTTP error handling", () => {
    it("should throw ConfiguratorHttpError on non-ok response with JSON body", async () => {
      mockNextFetchErrorResponse(401, JSON.stringify({ error: "Unauthorized" }));

      const error = await configuratorContext.getSettings().catch((e) => e);
      expect(error).toBeInstanceOf(ConfiguratorHttpError);
      expect(error.status).toBe(401);
      expect(error.body).toEqual({ error: "Unauthorized" });
    });

    it("should throw ConfiguratorHttpError with null body when response is not JSON", async () => {
      mockNextFetchErrorResponse(500, "Internal Server Error");

      const error = await configuratorContext.getSettings().catch((e) => e);
      expect(error).toBeInstanceOf(ConfiguratorHttpError);
      expect(error.status).toBe(500);
      expect(error.body).toBeNull();
    });

    it("should throw ConfiguratorHttpError with status 0 on network failure", async () => {
      fetchMock.mockRejectOnce(new TypeError("Failed to fetch"));

      const error = await configuratorContext.getSettings().catch((e) => e);
      expect(error).toBeInstanceOf(ConfiguratorHttpError);
      expect(error.status).toBe(0);
      expect(error.statusText).toBe("Failed to fetch");
      expect(error.body).toBeNull();
    });

    it("should not throw on successful response", async () => {
      mockNextFetchResponse({ setting: "value" });

      await expect(configuratorContext.getSettings()).resolves.toBeDefined();
    });
  });
});
