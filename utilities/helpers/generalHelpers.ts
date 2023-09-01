import { config } from '../config';

export const getApiUrl = () => {
  return config.protocol + config.baseUrls.api;
}

export const insertInObjectIf = (condition: boolean, keyValues: Object) => {
  return condition ? keyValues : {};
}

/**
 * Debounces a function, delaying its execution until after a specified wait time has elapsed since the last time it was invoked.
 * 
 * @param action - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export const debounce = <T extends (...args: any[]) => any>(
  action: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      action.apply(context, args);
      timeoutId = null;
    }, wait);
  };
};
