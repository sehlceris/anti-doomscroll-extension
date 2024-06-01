function getSites(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ sites: [] }, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.sites);
      }
    });
  });
}

function setSites(sites: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ sites: sites }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        setTimeout(resolve, 50);
      }
    });
  });
}

async function displaySites() {
  const sitesList = document.getElementById("sites-list");
  if (!sitesList) return;
  sitesList.innerHTML = ""; // Clear existing list

  try {
    const sites = await getSites();
    console.log("displaying sites - storage result:", sites);
    if (sites) {
      sites.forEach((site, index) => {
        const li = document.createElement("li");
        li.textContent = site;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "X"; // Using 'X' for delete, could use an icon here
        removeBtn.addEventListener("click", async () => {
          await removeSite(index);
          displaySites(); // Refresh the list display
        });

        li.appendChild(removeBtn);
        sitesList.appendChild(li);
      });
    } else {
      console.warn("No sites found in storage.");
    }
  } catch (error) {
    console.error("Error retrieving sites:", error);
  }
}

async function removeSite(index: number) {
  try {
    const sites = await getSites();
    if (sites) {
      sites.splice(index, 1);
      await setSites(sites);
      console.log("Site removed - updated sites:", sites);
    } else {
      console.warn("Failed to retrieve sites for removal.");
    }
  } catch (error) {
    console.error("Error removing site:", error);
  }
}

document.getElementById("add-site").addEventListener("click", async () => {
  const newSiteInput = document.getElementById("new-site") as HTMLInputElement;
  const newSite = newSiteInput.value.trim().toLowerCase();
  console.log("new site to add:", newSite);
  if (newSite && isValidDomain(newSite)) {
    try {
      const sites = await getSites();
      console.log("got sites before setting sites - storage result:", sites);
      if (!sites.includes(newSite)) {
        sites.push(newSite);
        console.log("setting sites - new sites array:", sites);
        await setSites(sites);
        console.log("set sites - updated sites:", sites);
        displaySites(); // Refresh the list display
        newSiteInput.value = ""; // Clear input field after adding
      } else {
        console.warn("Site already exists in the list.");
      }
    } catch (error) {
      console.error("Error adding site:", error);
    }
  } else {
    alert("Please enter a valid domain.");
  }
});

function isValidDomain(domain: string): boolean {
  // Simple domain validation logic
  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(
    domain
  );
}

document.addEventListener("DOMContentLoaded", displaySites);
