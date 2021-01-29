const floatSizeBytes = 4;

module.exports = {
    readFloat(buffer, offset, littleEndian = true) {
        if (littleEndian) {
            return buffer.readFloatLE(offset);
        } else {
            return buffer.readFloatBE(offset);
        }
    },

    bufferToFloatArray(buffer, littleEndian = true) {
        const length = Math.floor(buffer.length / floatSizeBytes);
        return Array.from( { length },
            (v, k) => module.exports
                .readFloat(buffer, k * floatSizeBytes, littleEndian));
    }
}
