document.addEventListener("DOMContentLoaded", function() {
    const reportBody = document.querySelector("#MM .t-Report-report tbody");

    if (reportBody) {
        // Function to shuffle rows after blinking effect
        function shuffleRows() {
            const rows = Array.from(reportBody.rows);
            const randomIndex = Math.floor(Math.random() * rows.length); // Random row index to shuffle

            const rowToMoveUp = rows[randomIndex];
            const rowToMoveDown = rows[randomIndex + 1] || rows[0]; // Select the next row (or loop back to the first one)

            // Apply blinking effect to both rows
            rowToMoveUp.classList.add("blinking");
            rowToMoveDown.classList.add("blinking");

            // Set a delay for blinking to end before shuffling
            setTimeout(() => {
                // Remove the blinking effect once the delay is over
                rowToMoveUp.classList.remove("blinking");
                rowToMoveDown.classList.remove("blinking");

                // Swap the rows positions
                reportBody.appendChild(rowToMoveUp);  // Move row up to the bottom
                reportBody.insertBefore(rowToMoveDown, rowToMoveUp);  // Move row down to the top

                // Apply color coding after rows have shuffled
                applyColorCoding();
            }, 1000); // Wait for the blinking effect (1s) to finish before shuffling
        }

        // Function to apply color coding and arrows based on F_RATE and OFFER_RATE values
        function applyColorCoding() {
            reportBody.querySelectorAll("tr").forEach(row => {
                const fRateCell = row.querySelector('[headers="SALE_RATE"]'); 
                const offerRateCell = row.querySelector('[headers="PURCHASE_RATE"]');

                // Check if both F_RATE and OFFER_RATE cells exist
                if (fRateCell && offerRateCell) {
                    const fRateValue = parseFloat(fRateCell.textContent) || 0;
                    const offerRateValue = parseFloat(offerRateCell.textContent) || 0;

                    // Clear any existing arrows before adding new ones
                    fRateCell.querySelector(".arrow")?.remove();
                    offerRateCell.querySelector(".arrow")?.remove();

                    // Create arrow containers for F_RATE and OFFER_RATE
                    const arrowContainerF = document.createElement("span");
                    const arrowContainerO = document.createElement("span");

                    // Add color coding and arrows based on comparison
                    if (fRateValue > offerRateValue) {
                        fRateCell.classList.add("high-value");
                        offerRateCell.classList.add("low-value");

                        // Add green up arrow for F_RATE (on the right side)
                        arrowContainerF.classList.add("arrow", "arrow-up");
                        arrowContainerF.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <polygon points="10,3 15,8 5,8" />
                            </svg>
                        `;
                        // Add red down arrow for OFFER_RATE (on the right side)
                        arrowContainerO.classList.add("arrow", "arrow-down");
                        arrowContainerO.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <polygon points="10,17 15,12 5,12" />
                            </svg>
                        `;
                    } else {
                        fRateCell.classList.add("low-value");
                        offerRateCell.classList.add("high-value");

                        // Add red down arrow for F_RATE (on the right side)
                        arrowContainerF.classList.add("arrow", "arrow-down");
                        arrowContainerF.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <polygon points="10,17 15,12 5,12" />
                            </svg>
                        `;
                        // Add green up arrow for OFFER_RATE (on the right side)
                        arrowContainerO.classList.add("arrow", "arrow-up");
                        arrowContainerO.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <polygon points="10,3 15,8 5,8" />
                            </svg>
                        `;
                    }

                    // Append the arrows to the right side of the respective cells
                    fRateCell.appendChild(arrowContainerF);
                    offerRateCell.appendChild(arrowContainerO);
                }
            });
        }

        // Initial application of color coding and arrows
        applyColorCoding();

        // Shuffle rows every 3 seconds after blinking
        setInterval(() => {
            shuffleRows();
        }, 3000);  // Shuffle every 3 seconds
    }
});
