const isResizeRequired = (oldConfig, newConfig) => {
        let { width, height } = oldConfig,
            newWidth = newConfig.width,
            newHeight = newConfig.height;

        if (width !== newWidth || height !== newHeight) {
            return true;
        }
        return false;
    },
    isChartTypeChanged = (oldConfig, newConfig) => {
        return (oldConfig.type !== newConfig.type);
    },
    isDataSourceUpdated = (oldConfig, newConfig) => {
        return true;
    };

export {
    isResizeRequired,
    isChartTypeChanged,
    isDataSourceUpdated
};
