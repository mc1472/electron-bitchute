const { app, BrowserWindow, BrowserView} = require("electron");

function create_window() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    win.loadFile("index.html")
    let bit_view = new BrowserView();
    win.setBrowserView(bit_view);
    bit_view.setBounds({ x: 0, y:0, width: 800, height: 600 });
    bit_view.webContents.loadURL("http://bitchute.com");
    win.on("resize", function () {
        let old_bounds = bit_view.getBounds();
        let new_size = win.getSize();
        old_bounds.width = new_size[0];
        old_bounds.height = new_size[1];
        bit_view.setBounds(old_bounds);
    });
}

app.on("ready", create_window);
