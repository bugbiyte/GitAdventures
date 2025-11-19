import SpaceTravelMockApi from "./SpaceTravelMockApi.js";

class SpaceTravelApi {
  static async getPlanets() {
    const res = await SpaceTravelMockApi.getPlanets();
    if (res.isError) {
      throw new Error("Failed to fetch planets");
    }
    return res.data; // <-- return the array of planets
  }

  static async getSpacecrafts() {
    const res = await SpaceTravelMockApi.getSpacecrafts();
    if (res.isError) {
      throw new Error("Failed to fetch spacecrafts");
    }
    return res.data; // <-- return the array of spacecraft
  }

  static async getSpacecraftById({ id }) {
    const res = await SpaceTravelMockApi.getSpacecraftById({ id });
    if (res.isError) {
      throw new Error("Failed to fetch spacecraft");
    }
    return res.data; // <-- return the single spacecraft object
  }

  static async buildSpacecraft({
    name,
    capacity,
    description,
    pictureUrl = undefined,
  }) {
    // spec says "void", so we won't rely on returned data
    const res = await SpaceTravelMockApi.buildSpacecraft({
      name,
      capacity,
      description,
      pictureUrl,
    });
    if (res?.isError) {
      throw new Error("Failed to build spacecraft");
    }
    return res?.data; // might be undefined; components can ignore it or refetch
  }

  static async destroySpacecraftById({ id }) {
    const res = await SpaceTravelMockApi.destroySpacecraftById({ id });
    if (res?.isError) {
      throw new Error("Failed to destroy spacecraft");
    }
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    const res = await SpaceTravelMockApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId,
    });
    if (res?.isError) {
      throw new Error("Failed to send spacecraft");
    }
  }
}

export default SpaceTravelApi;
