/*
    Copyright (c) 2022 Alethea Katherine Flowers.
    Published under the standard MIT License.
    Full text available at: https://opensource.org/licenses/MIT
*/

type ResizeObserverCallback = (
    clientWidth: number,
    clientHeight: number,
    pixelWidth: number,
    pixelHeight: number
) => void;

/**
 * Like ResizeObserver, but specific to HTMLCanvasElement.
 *
 * Handles setting the initial canvas size based on the device pixel ratio,
 * and handling any subsequent resize events by adjusting the canvas size
 * appropriately
 */
export class CanvasSizeObserver {
    #observer: ResizeObserver;

    /**
     * Create a CanvasSizeObserver
     */
    constructor(
        public canvas: HTMLCanvasElement,
        private callback: ResizeObserverCallback
    ) {
        this.#observer = new ResizeObserver(() => {
            this.resize();
        });
        this.#observer.observe(canvas);
    }

    dispose() {
        this.#observer.disconnect();
    }

    /** Resizes the canvas
     *
     * Typically not called directly, it's invoked automatically through
     * event listeners.
     */
    resize() {
        const c = this.canvas;
        c.width = c.clientWidth * window.devicePixelRatio;
        c.height = c.clientHeight * window.devicePixelRatio;
        this.callback(c.clientWidth, c.clientHeight, c.width, c.height);
    }
}
