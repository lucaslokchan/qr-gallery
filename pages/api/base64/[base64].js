export default function handler(req, res) {
  // Extract the base64 code from the URL
  const base64Code = req.query.base64;

  
  try {
    // Decode the base64 code
    const decodedCode = Buffer.from(base64Code, "base64").toString("utf-8");

    // Execute the decoded code
    //const result = eval(decodedCode);

    // Send the result as the response
    //res.status(200).json({ result });
    //res.status(200).json({ decodedCode });
    return (
      <div>
        <h1>Dynamic Three.js Scene</h1>
        <textarea
          rows={10}
          value={sceneData}
          onChange={(e) => setSceneData(e.target.value)}
          placeholder="Enter Three.js scene data..."
        />
        <Canvas>
          {/* Render the scene using react-three-fiber */}
          {sceneData && <primitive object={sceneRef.current} />}
        </Canvas>
      </div>
    );
  } catch (error) {
    res
      .status(400)
      .json({ error: "Invalid JavaScript code or execution error" });
  }
}
