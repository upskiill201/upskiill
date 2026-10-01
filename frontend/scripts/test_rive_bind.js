const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const riveJs = fs.readFileSync(path.join(__dirname, '../node_modules/@rive-app/canvas/rive.js'), 'utf8');
  const rivBytes = fs.readFileSync(path.join(__dirname, '../public/Rive/treasure_chest.riv'));
  const base64Riv = rivBytes.toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="canvas" width="500" height="500"></canvas>
      <script>${riveJs}</script>
      <script>
        window.results = [];
        function log(...args) { window.results.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')); }
        
        async function run() {
          try {
            const raw = atob("${base64Riv}");
            const uint8Array = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) uint8Array[i] = raw.charCodeAt(i);
            
            const r = new rive.Rive({
              buffer: uint8Array.buffer,
              canvas: document.getElementById('canvas'),
              autoplay: true,
              stateMachines: ['State Machine 1'],
              onLoad: () => {
                log('LOADED');
                const vm = r.viewModelByName('TChest');
                const vmi = r.viewModelInstance || vm.defaultInstance();
                
                log('vmi bound:', !!vmi);
                
                // Let us inspect artboard and draw / animations
                const artboard = r.artboard;
                log('artboard draw objects count or node names:');
                
                const rewords = vmi.viewModel('rewords');
                const rt = rewords.enum('rewardType');
                log('Default rewardType:', rt.value, rt.valueIndex);
                
                // Set to xpRewards
                rt.value = 'xpRewards';
                log('Set to xpRewards:', rt.value, rt.valueIndex);
                
                // Also check if vmi needs bind or artboard needs bind
                if (r.bindViewModelInstance) {
                  log('r has bindViewModelInstance');
                  r.bindViewModelInstance(vmi);
                }
                
                const clk = vmi.trigger('click');
                // Let's click 5 times
                let c = 0;
                const timer = setInterval(() => {
                  c++;
                  log('Click ' + c);
                  clk.trigger();
                  if (c >= 6) {
                    clearInterval(timer);
                    setTimeout(() => {
                      log('Done 6 clicks. Current rt value:', rt.value, rt.valueIndex);
                      window.done = true;
                    }, 2000);
                  }
                }, 300);
              }
            });
          } catch(e) {
            log('ERR:', e.message);
            window.done = true;
          }
        }
        run();
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction(() => window.done === true, { timeout: 15000 });
  const results = await page.evaluate(() => window.results);
  console.log('RESULTS:');
  results.forEach(r => console.log('  ', r));

  await browser.close();
}

main().catch(console.error);
